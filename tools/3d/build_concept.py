"""Build the Angostura Uno CONCEPT model and export it for the web.

This is a concept, not the product: proportions are typical of a universal
in-ear monitor and are not specifications. It is replaced by an export from
the real CAD when that exists (see docs/PHASE3-3D-BRIEF.md).

Run headless:
    blender -b --python tools/3d/build_concept.py -- <out_dir>

Units: 1 Blender unit = 1 mm. Frame: faceplate faces +Z, nozzle points
roughly -Z. Everything hangs off a root empty that maps +Z to glTF +Z.
"""
import math
import os
import sys
import traceback

import bmesh
import bpy
from mathutils import Matrix, Vector

OUT = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else os.getcwd()
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
LOG = open(os.path.join(OUT, "build.log"), "w")


def log(*a):
    LOG.write(" ".join(str(x) for x in a) + "\n")
    LOG.flush()


# ---------------------------------------------------------------- helpers
def material(name, color, metallic=0.0, roughness=0.5, coat=0.0, alpha=1.0, emission=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Metallic"].default_value = metallic
    b.inputs["Roughness"].default_value = roughness
    b.inputs["Coat Weight"].default_value = coat
    b.inputs["Coat Roughness"].default_value = 0.1
    b.inputs["Alpha"].default_value = alpha
    if emission:
        b.inputs["Emission Color"].default_value = (*emission, 1)
        b.inputs["Emission Strength"].default_value = 1.0
    if alpha < 1:
        m.blend_method = "BLEND"
    return m


def hexrgb(h):
    h = h.lstrip("#")
    srgb = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb)


def obj_from_bmesh(name, bm, mat, smooth=True):
    me = bpy.data.meshes.new(name)
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    me.materials.append(mat)
    if smooth:
        for p in me.polygons:
            p.use_smooth = True
    return ob


def apply_modifiers(ob):
    bpy.context.view_layer.objects.active = ob
    for o in bpy.context.selected_objects:
        o.select_set(False)
    ob.select_set(True)
    for mod in list(ob.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)


def cylinder(name, r, depth, mat, seg=48, r2=None, loc=(0, 0, 0), rot=None, smooth=True):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r, radius2=r if r2 is None else r2, depth=depth)
    ob = obj_from_bmesh(name, bm, mat, smooth)
    ob.location = loc
    if rot:
        ob.rotation_euler = rot
    if smooth:
        m = ob.modifiers.new("edge", "EDGE_SPLIT")
        m.split_angle = math.radians(40)
    return ob


def box(name, size, mat, loc=(0, 0, 0), bevel=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=size, verts=bm.verts)
    ob = obj_from_bmesh(name, bm, mat, smooth=False)
    ob.location = loc
    if bevel:
        m = ob.modifiers.new("bevel", "BEVEL")
        m.width = bevel
        m.segments = 2
    return ob


def empty(name, parent=None):
    e = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(e)
    if parent:
        e.parent = parent
    return e


def parent_keep(child, parent):
    child.parent = parent
    return child


def align_z_to(ob, direction):
    """Rotate so the object's local +Z points along `direction`."""
    ob.rotation_mode = "QUATERNION"
    ob.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(Vector(direction).normalized())


# ---------------------------------------------------------------- outline
def outline_r(t):
    """Radius of the shell outline at angle t: a rounded triangle, as on
    machined-metal universal monitors."""
    return 9.1 + 1.2 * math.cos(t - 0.6) + 0.45 * math.cos(2 * t + 0.4) + 1.05 * math.cos(3 * t - 0.9)


def outline_pt(t, scale=1.0):
    r = outline_r(t) * scale
    return Vector((r * math.cos(t) * 1.12, r * math.sin(t), 0))


DEPTH = 10.5  # shell depth below the faceplate plane
BAND = 2.6  # straight machined wall under the faceplate
CHAMFER = 0.7  # 45 degree break between the wall and the body
BODY = 0.925  # outline scale where the body starts, after the chamfer
LEAN = Vector((-3.2, -1.6, 0))  # how far the deepest point drifts toward the nozzle
NOZZLE_DIR = Vector((-0.5, -0.24, -0.83)).normalized()


def shell_point(t, d):
    """Point on the shell body: angle t, depth fraction d in 0..1, measured
    from the bottom of the chamfer to the deepest point."""
    s = BODY * (1 - d**2.4) ** 0.5  # dome profile
    top = BAND + CHAMFER
    return outline_pt(t, s) + LEAN * (d**1.5) + Vector((0, 0, -top - (DEPTH - top) * d))


def outline_frame(t, z):
    """A local frame on the straight wall: x along the wall, y toward the
    faceplate, z pointing out of the shell."""
    eps = 1e-3
    tangent = (outline_pt(t + eps) - outline_pt(t - eps)).normalized()
    up = Vector((0, 0, 1))
    normal = tangent.cross(up).normalized()
    origin = outline_pt(t) + Vector((0, 0, z))
    if normal.dot(origin.xy.to_3d()) < 0:
        normal, tangent = -normal, -tangent
    m = Matrix((tangent, up, normal)).transposed().to_4x4()
    m.translation = origin
    return m


def build():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene

    M = {
        # "resin" keeps its name for the web code; the concept shell is anodised metal
        "resin": material("resin", hexrgb("#4a4945"), 1.0, 0.46),
        "plate": material("plate", hexrgb("#5a5852"), 1.0, 0.4),
        "mark": material("mark", hexrgb("#dedbd2"), 0.0, 0.8),
        "metal": material("metal", hexrgb("#c9c6bd"), 1.0, 0.28),
        "steel": material("steel", hexrgb("#a9a7a0"), 1.0, 0.42),
        "brass": material("brass", hexrgb("#b08a3c"), 1.0, 0.35),
        "ceramic": material("ceramic", hexrgb("#e4e1d8"), 0.0, 0.55),
        "dark": material("dark", hexrgb("#161615"), 0.2, 0.6),
        "board": material("board", hexrgb("#24332b"), 0.1, 0.55),
        "part": material("part", hexrgb("#c7a56a"), 0.2, 0.5),
        "pad": material("pad", hexrgb("#ffb000"), 1.0, 0.3),
        "tube": material("tube", hexrgb("#d9d6cc"), 0.0, 0.35, alpha=0.55),
        "tip": material("tip", hexrgb("#2a2a28"), 0.0, 0.65),
    }

    root = empty("angostura_uno_concept")
    # glTF is Y-up: Blender (x, y, z) -> glTF (x, z, -y). Rotating the root by
    # +90 deg about X sends model +Z to Blender -Y, which lands on glTF +Z.
    root.rotation_euler = (math.radians(90), 0, 0)

    # ------------------------------------------------ 01 shell
    SEG, RINGS = 96, 28
    bm = bmesh.new()
    rings = [
        [bm.verts.new(outline_pt(2 * math.pi * i / SEG)) for i in range(SEG)],
        [bm.verts.new(outline_pt(2 * math.pi * i / SEG) + Vector((0, 0, -BAND))) for i in range(SEG)],
    ]
    for j in range(RINGS):
        d = j / RINGS
        rings.append([bm.verts.new(shell_point(2 * math.pi * i / SEG, d)) for i in range(SEG)])
    pole = bm.verts.new(LEAN + Vector((0, 0, -DEPTH)))
    for j in range(len(rings) - 1):
        for i in range(SEG):
            a, b = rings[j][i], rings[j][(i + 1) % SEG]
            c, e = rings[j + 1][(i + 1) % SEG], rings[j + 1][i]
            bm.faces.new((a, e, c, b))
    for i in range(SEG):
        bm.faces.new((rings[-1][i], pole, rings[-1][(i + 1) % SEG]))
    shell = obj_from_bmesh("shell", bm, M["resin"])
    sol = shell.modifiers.new("wall", "SOLIDIFY")
    sol.thickness = 1.0
    sol.offset = -1
    es = shell.modifiers.new("edge", "EDGE_SPLIT")
    es.split_angle = math.radians(32)
    shell.parent = root

    def on_wall(name, bm, mat, t, z, smooth=False):
        ob = obj_from_bmesh(name, bm, mat, smooth)
        ob.matrix_world = outline_frame(t, z)
        return ob

    # connector: a flush two-pin socket set into the straight wall
    t_sock = math.radians(80)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=(4.8, 1.9, 1.3), verts=bm.verts)
    bmesh.ops.translate(bm, vec=(0, 0, -0.6), verts=bm.verts)
    socket = on_wall("socket", bm, M["dark"], t_sock, -BAND / 2)
    bev = socket.modifiers.new("bevel", "BEVEL")
    bev.width = 0.45
    bev.segments = 4
    for k, x in enumerate((-1.0, 1.0)):
        bm = bmesh.new()
        bmesh.ops.create_cone(bm, cap_ends=True, segments=20, radius1=0.4, radius2=0.4, depth=0.3)
        bmesh.ops.translate(bm, vec=(x, 0, -0.08), verts=bm.verts)
        pin = on_wall(f"socket_pin_{k}", bm, M["pad"], t_sock, -BAND / 2, smooth=True)
        pin.parent = socket
        pin.matrix_parent_inverse = socket.matrix_world.inverted()
    socket.parent = shell

    # pressure vent: a small flush port on the wall
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=20, radius1=0.38, radius2=0.38, depth=0.3)
    bmesh.ops.translate(bm, vec=(0, 0, -0.1), verts=bm.verts)
    vent = on_wall("vent", bm, M["dark"], math.radians(215), -BAND / 2, smooth=True)
    vent.parent = shell

    # ------------------------------------------------ 02 faceplate
    bm = bmesh.new()
    PSEG = 128
    top = [bm.verts.new(outline_pt(2 * math.pi * i / PSEG, 0.912) + Vector((0, 0, 1.0))) for i in range(PSEG)]
    mid = [bm.verts.new(outline_pt(2 * math.pi * i / PSEG, 0.95) + Vector((0, 0, 0.62))) for i in range(PSEG)]
    bot = [bm.verts.new(outline_pt(2 * math.pi * i / PSEG, 0.95) + Vector((0, 0, -0.2))) for i in range(PSEG)]
    bm.faces.new(top)
    bm.faces.new(list(reversed(bot)))
    for ra, rb in ((top, mid), (mid, bot)):
        for i in range(PSEG):
            bm.faces.new((ra[i], rb[i], rb[(i + 1) % PSEG], ra[(i + 1) % PSEG]))
    plate = obj_from_bmesh("faceplate", bm, M["plate"])
    es = plate.modifiers.new("edge", "EDGE_SPLIT")
    es.split_angle = math.radians(30)
    plate.parent = root

    # wordmark on the faceplate, from the outlined brand SVG
    try:
        svg = os.path.join(REPO, "docs", "brand", "echelis-wordmark-on-dark.svg")
        before = set(bpy.data.objects)
        bpy.ops.import_curve.svg(filepath=svg)
        curves = [o for o in bpy.data.objects if o not in before]
        for o in bpy.context.selected_objects:
            o.select_set(False)
        for c in curves:
            c.select_set(True)
        bpy.context.view_layer.objects.active = curves[0]
        bpy.ops.object.convert(target="MESH")
        if len(curves) > 1:
            bpy.ops.object.join()
        mark = bpy.context.view_layer.objects.active
        mark.name = "wordmark"
        bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
        width = max(mark.dimensions.x, mark.dimensions.y)
        k = 9.0 / width  # about 9 mm wide on the concept plate
        mark.scale = (k, k, k)
        mark.location = (0.6, 0.2, 1.012)
        mark.rotation_euler = (0, 0, math.radians(-18))
        mark.data.materials.clear()
        mark.data.materials.append(M["mark"])
        for col in list(mark.users_collection):
            col.objects.unlink(mark)
        bpy.context.collection.objects.link(mark)
        mark.parent = plate
    except Exception:
        log("wordmark failed:\n" + traceback.format_exc())

    # ------------------------------------------------ 03 nozzle (+ filter)
    base = LEAN + Vector((0, 0, -DEPTH)) + NOZZLE_DIR * -1.6
    nozzle = empty("nozzle", root)
    nozzle.location = base
    align_z_to(nozzle, NOZZLE_DIR)
    flare = cylinder("nozzle_flare", 4.4, 2.6, M["resin"], r2=3.3, loc=(0, 0, 1.3))
    collar = cylinder("nozzle_collar", 3.3, 0.5, M["resin"], loc=(0, 0, 2.85))
    stem = cylinder("nozzle_stem", 2.9, 5.0, M["steel"], loc=(0, 0, 5.6))
    lip = cylinder("nozzle_lip", 3.4, 0.9, M["steel"], loc=(0, 0, 8.45))
    collar.parent = nozzle
    filt = cylinder("nozzle_filter", 2.5, 0.12, M["steel"], seg=32, loc=(0, 0, 8.93))
    for o in (flare, stem, lip, filt):
        o.parent = nozzle
    for k in range(3):  # three bores, shown as dark insets in the filter
        a = 2 * math.pi * k / 3
        bore = cylinder(f"bore_{k}", 0.62, 0.06, M["dark"], seg=20, loc=(1.15 * math.cos(a), 1.15 * math.sin(a), 9.0))
        bore.parent = nozzle
    tip_origin = base + NOZZLE_DIR * 8.9

    # ------------------------------------------------ ear tip (optional part)
    profile = [(2.1, 0.0), (5.6, 0.6), (6.4, 3.0), (5.9, 5.6), (4.4, 7.6), (2.9, 8.6), (2.1, 8.8), (2.1, 7.6), (2.1, 0.0)]
    bm = bmesh.new()
    TSEG = 56
    prs = []
    for r, z in profile[:-1]:
        prs.append([bm.verts.new((r * math.cos(2 * math.pi * i / TSEG), r * math.sin(2 * math.pi * i / TSEG), z)) for i in range(TSEG)])
    for j in range(len(prs)):
        ra, rb = prs[j], prs[(j + 1) % len(prs)]
        for i in range(TSEG):
            bm.faces.new((ra[i], ra[(i + 1) % TSEG], rb[(i + 1) % TSEG], rb[i]))
    eartip = obj_from_bmesh("eartip", bm, M["tip"])
    sub = eartip.modifiers.new("sub", "SUBSURF")
    sub.levels = 1
    eartip.parent = root
    eartip.location = base + NOZZLE_DIR * 3.4
    align_z_to(eartip, NOZZLE_DIR)

    # ------------------------------------------------ 04 drivers (+ tubes)
    drivers = empty("drivers", root)
    dd_c = Vector((2.6, -1.0, -5.3))
    dd = cylinder("driver_dd", 5.0, 3.2, M["metal"], seg=64, loc=dd_c)
    dd.parent = drivers
    for nm, r, dpt, mat, dz in (("dd_rim", 5.25, 0.5, M["steel"], 1.2), ("dd_grille", 3.6, 0.12, M["dark"], -1.62), ("dd_vent", 0.55, 0.12, M["dark"], 1.62)):
        o = cylinder(nm, r, dpt, mat, seg=48, loc=(0, 0, dz))
        o.parent = dd
    ba_c = Vector((-5.4, 2.4, -4.0))
    ba = box("driver_ba", (5.0, 2.7, 3.9), M["steel"], loc=ba_c, bevel=0.25)
    ba.parent = drivers
    spout = cylinder("ba_spout", 0.7, 1.6, M["steel"], seg=20, loc=(0, 0, -2.6))
    spout.parent = ba
    pz_c = Vector((-2.6, -2.4, -2.9))
    piezo = cylinder("driver_piezo", 2.5, 0.3, M["brass"], seg=48, loc=pz_c)
    piezo.parent = drivers
    cer = cylinder("piezo_ceramic", 2.0, 0.2, M["ceramic"], seg=48, loc=(0, 0, 0.22))
    cer.parent = piezo

    def tube(name, start, end, bend):
        cu = bpy.data.curves.new(name, "CURVE")
        cu.dimensions = "3D"
        cu.bevel_depth = 0.75
        cu.bevel_resolution = 3
        cu.resolution_u = 10
        sp = cu.splines.new("BEZIER")
        sp.bezier_points.add(1)
        a, b = sp.bezier_points
        a.co, b.co = start, end
        a.handle_left_type = a.handle_right_type = b.handle_left_type = b.handle_right_type = "FREE"
        a.handle_right = Vector(start) + Vector(bend)
        a.handle_left = Vector(start) - Vector(bend)
        b.handle_left = Vector(end) - NOZZLE_DIR * 2.5
        b.handle_right = Vector(end) + NOZZLE_DIR * 2.5
        ob = bpy.data.objects.new(name, cu)
        bpy.context.collection.objects.link(ob)
        cu.materials.append(M["tube"])
        ob.parent = drivers
        return ob

    mouth = base + NOZZLE_DIR * 1.0
    tubes = [
        tube("tube_dd", dd_c + Vector((-2.5, -1.0, -1.7)), mouth + Vector((0.9, 0.2, 0)), (-1.5, -0.8, -1.8)),
        tube("tube_ba", ba_c + Vector((0, 0, -3.4)), mouth + Vector((-0.6, 0.8, 0)), (0, -0.6, -1.8)),
        tube("tube_piezo", pz_c + Vector((0, 0, -0.4)), mouth + Vector((-0.4, -0.9, 0)), (0.4, 0.4, -2.2)),
    ]

    # ------------------------------------------------ 05 crossover
    cross = empty("crossover", root)
    cross.location = (2.6, 3.2, -1.4)
    cross.rotation_euler = (0, 0, math.radians(20))
    pcb = box("crossover_board", (7.2, 4.6, 0.6), M["board"], bevel=0.12)
    pcb.parent = cross
    comps = [((-2.0, 0.9, 0.7), (1.7, 0.9, 0.8), "part"), ((0.2, 0.9, 0.7), (1.7, 0.9, 0.8), "part"), ((2.3, 0.8, 0.55), (1.1, 0.6, 0.5), "dark"),
             ((-1.6, -1.0, 0.55), (1.1, 0.6, 0.5), "dark"), ((0.9, -1.0, 0.8), (2.2, 1.3, 1.0), "dark")]
    for n, (loc, size, mat) in enumerate(comps):
        c = box(f"crossover_part_{n}", size, M[mat], loc=loc, bevel=0.06)
        c.parent = cross
    for n, x in enumerate((-3.0, -2.3, 2.6, 3.1)):
        pad = box(f"crossover_pad_{n}", (0.5, 0.7, 0.08), M["pad"], loc=(x, -1.75, 0.33))
        pad.parent = cross

    # ------------------------------------------------ finalise meshes
    bpy.context.view_layer.update()
    for ob in list(bpy.data.objects):
        if ob.type == "CURVE":
            for o in bpy.context.selected_objects:
                o.select_set(False)
            ob.select_set(True)
            bpy.context.view_layer.objects.active = ob
            bpy.ops.object.convert(target="MESH")
            for p in ob.data.polygons:
                p.use_smooth = True
        elif ob.type == "MESH" and ob.modifiers:
            apply_modifiers(ob)

    tris = {}
    for ob in bpy.data.objects:
        if ob.type == "MESH":
            ob.data.calc_loop_triangles()
            top_name = ob.name
            anc = ob
            while anc.parent and anc.parent != root:
                anc = anc.parent
            tris[anc.name] = tris.get(anc.name, 0) + len(ob.data.loop_triangles)
    log("triangles per part:", tris, "total", sum(tris.values()))
    return root, scene


def render(scene, root, path, explode, poster=False):
    """Preview render so the model can be checked without opening Blender."""
    offsets = {"shell": -7, "faceplate": 21, "nozzle": -19, "eartip": -30, "drivers": 2, "crossover": 11.5}
    moved = []
    if explode:
        for ob in root.children:
            if ob.name in offsets:
                moved.append((ob, ob.location.copy()))
                ob.location = ob.location + Vector((0, 0, offsets[ob.name]))
    cam_d = bpy.data.cameras.new("cam")
    cam_d.lens = 85
    cam = bpy.data.objects.new("cam", cam_d)
    scene.collection.objects.link(cam)
    # root maps model +Z to world -Y; look from the faceplate side, three-quarter
    target = Vector((0, 8, -2)) if explode else Vector((-5, 7, -3)) if poster else Vector((-2, 6, -3))
    direction = Vector((-0.85, -0.35, 0.3)) if explode else Vector((-0.55, -0.75, 0.3))
    cam.location = target + direction.normalized() * (235 if explode else 112 if poster else 120)
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam
    lights = []
    for name, loc, energy, size, col in (("key", (40, -50, 60), 60000, 40, (1, 0.95, 0.86)), ("rim", (-50, 40, 30), 40000, 30, (0.8, 0.88, 1)), ("fill", (-30, -60, -20), 12000, 60, (1, 1, 1))):
        ld = bpy.data.lights.new(name, "AREA")
        ld.energy, ld.size, ld.color = energy, size, col
        lo = bpy.data.objects.new(name, ld)
        lo.location = loc
        lo.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        scene.collection.objects.link(lo)
        lights.append(lo)
    world = bpy.data.worlds.new("w")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (*hexrgb("#0e0e0d"), 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 1.0
    scene.world = world
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 48
    scene.cycles.use_denoising = True
    scene.render.resolution_x, scene.render.resolution_y = (1000, 1000) if poster else (1200, 800)
    scene.render.film_transparent = poster
    scene.render.image_settings.color_mode = "RGBA" if poster else "RGB"
    if poster:
        # a soft grey surround so the metal has something to reflect; the
        # film is transparent, so it does not appear in the image
        world.node_tree.nodes["Background"].inputs[0].default_value = (0.42, 0.41, 0.39, 1)
        scene.cycles.samples = 96
    scene.render.filepath = path
    scene.view_settings.view_transform = "Standard"
    bpy.ops.render.render(write_still=True)
    for o in [cam] + lights:
        bpy.data.objects.remove(o)
    for ob, loc in moved:
        ob.location = loc


try:
    root, scene = build()
    glb = os.path.join(OUT, "angostura-uno-concept.raw.glb")
    bpy.ops.export_scene.gltf(filepath=glb, export_format="GLB", export_apply=True, export_yup=True, export_cameras=False, export_lights=False, export_materials="EXPORT")
    log("exported", glb, os.path.getsize(glb), "bytes")
    if "--no-render" not in sys.argv:
        render(scene, root, os.path.join(OUT, "preview-assembled.png"), False)
        render(scene, root, os.path.join(OUT, "preview-exploded.png"), True)
        render(scene, root, os.path.join(OUT, "poster.png"), False, poster=True)
        log("rendered previews")
    log("DONE")
except Exception:
    log("FAILED\n" + traceback.format_exc())
finally:
    LOG.close()
    open(os.path.join(OUT, "done.flag"), "w").write("x")
