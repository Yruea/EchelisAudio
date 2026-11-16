"""Fusion script: export the Angosta One design for the website.

UNTESTED: written against the documented Fusion API before any CAD existed.
Run it once on a simple test design and report what happens.

Install: Fusion > Utilities > Scripts and Add-Ins > Scripts > "+" > pick this
folder (EchelisExport). Run it with the design open.

It writes, into a folder you choose:
  angosta-one.step      the whole assembly (precise master)
  <part>.stl              one high-refinement mesh per named component
  export-report.txt       which expected parts were found or missing

Components are matched by name. See docs/PHASE3-3D-BRIEF.md, section 5.
"""
import os
import traceback

import adsk.core
import adsk.fusion

EXPECTED = [
    "shell", "faceplate", "nozzle", "nozzle_filter", "driver_dd", "driver_ba",
    "driver_piezo", "crossover", "socket", "tubes", "eartip",
]


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = adsk.fusion.Design.cast(app.activeProduct)
        if not design:
            ui.messageBox("Open the Angosta One design first.")
            return

        dialog = ui.createFolderDialog()
        dialog.title = "Choose the export folder"
        if dialog.showDialog() != adsk.core.DialogResults.DialogOK:
            return
        out = dialog.folder

        manager = design.exportManager
        root = design.rootComponent
        lines = []

        step = manager.createSTEPExportOptions(os.path.join(out, "angosta-one.step"), root)
        manager.execute(step)
        lines.append("STEP: angosta-one.step")

        # first occurrence of each component, matched by lower-cased name
        found = {}
        for occ in root.allOccurrences:
            name = occ.component.name.strip().lower()
            found.setdefault(name, occ)

        for part in EXPECTED:
            occ = found.get(part)
            if not occ:
                lines.append(f"MISSING: {part}")
                continue
            stl = manager.createSTLExportOptions(occ, os.path.join(out, f"{part}.stl"))
            stl.meshRefinement = adsk.fusion.MeshRefinementSettings.MeshRefinementHigh
            manager.execute(stl)
            lines.append(f"OK: {part}.stl")

        extra = sorted(set(found) - set(EXPECTED))
        if extra:
            lines.append("NOT EXPORTED (unexpected names): " + ", ".join(extra))

        with open(os.path.join(out, "export-report.txt"), "w") as handle:
            handle.write("\n".join(lines) + "\n")
        ui.messageBox("Echelis export finished.\n\n" + "\n".join(lines))
    except Exception:
        if ui:
            ui.messageBox("Export failed:\n" + traceback.format_exc())
