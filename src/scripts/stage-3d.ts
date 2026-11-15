// Real-time placeholder model for the exploded-view sequence.
// PLACEHOLDER GEOMETRY: simple primitives stand in for each IEM layer so the
// choreography can be approved before real modelling (Phase 3). Shapes,
// proportions and driver count here are NOT product specs.
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Material,
  type Object3D,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { StageState } from './stage-scroll';

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Part {
  id: string;
  node: Object3D;
  /** offset along the explode axis (model z) when fully exploded */
  offset: number;
  materials: (Material & { opacity: number })[];
}

export function initStage3D(stage: HTMLElement, state: StageState) {
  const canvas = stage.querySelector<HTMLCanvasElement>('.stage__canvas')!;
  const view = stage.querySelector<HTMLElement>('.stage__view')!;
  const leader = stage.querySelector<SVGSVGElement>('.stage__leader')!;
  const leaderLine = leader.querySelector('line')!;
  const leaderDot = leader.querySelector('circle')!;
  const callouts = [...stage.querySelectorAll<HTMLElement>('.callout')];

  const small = matchMedia('(max-width: 47.99rem)').matches;
  const seg = small ? 32 : 64;
  const renderer = new WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  // studio lighting: warm key, cool rim
  const key = new DirectionalLight(new Color('#fff1dc'), 2.4);
  key.position.set(3, 4, 5);
  const rim = new DirectionalLight(new Color('#cfe0ff'), 1.6);
  rim.position.set(-4, 2, -4);
  scene.add(key, rim);

  const mat = {
    resin: new MeshPhysicalMaterial({ color: '#4a4843', roughness: 0.22, metalness: 0, clearcoat: small ? 0 : 1, clearcoatRoughness: 0.15, side: DoubleSide, transparent: true }),
    metal: new MeshStandardMaterial({ color: '#b9b7b0', roughness: 0.28, metalness: 1, transparent: true }),
    plate: new MeshStandardMaterial({ color: '#c9c6bd', roughness: 0.42, metalness: 1, transparent: true }),
    driver: new MeshStandardMaterial({ color: '#d8d5cc', roughness: 0.4, metalness: 0.8, transparent: true }),
    board: new MeshStandardMaterial({ color: '#6b6963', roughness: 0.6, metalness: 0.2, transparent: true }),
    chip: new MeshStandardMaterial({ color: css('--accent'), roughness: 0.5, metalness: 0.3, transparent: true }),
  };

  const model = new Group();
  const parts: Part[] = [];
  const add = (id: string, offset: number, node: Object3D, ...materials: Part['materials']) => {
    model.add(node);
    parts.push({ id, node, offset, materials });
  };

  // 01 shell: an open bowl
  const shell = new Mesh(new SphereGeometry(1, seg, seg / 2, 0, Math.PI * 2, 0, Math.PI / 2), mat.resin);
  shell.rotation.x = -Math.PI / 2;
  shell.scale.set(1, 0.7, 0.82);
  add('shell', -0.7, shell, mat.resin);

  // 02 faceplate: a thin lid
  const plate = new Mesh(new CylinderGeometry(1, 1, 0.06, seg), mat.plate);
  plate.rotation.x = Math.PI / 2;
  plate.scale.set(1, 1, 0.82);
  plate.position.z = 0.03;
  add('faceplate', 2.1, plate, mat.plate);

  // 03 nozzle
  const nozzle = new Mesh(new CylinderGeometry(0.15, 0.19, 0.6, seg / 2), mat.metal);
  nozzle.rotation.set(Math.PI / 2 - 0.5, 0, 0.5);
  nozzle.position.set(-0.45, -0.35, -0.72);
  add('nozzle', -1.9, nozzle, mat.metal);

  // 04 drivers: stand-ins for "more than one kind of driver"
  const drivers = new Group();
  const dd = new Mesh(new CylinderGeometry(0.34, 0.34, 0.16, seg / 2), mat.driver);
  dd.rotation.x = Math.PI / 2;
  dd.position.set(-0.2, 0.05, 0);
  const ba = new Mesh(new BoxGeometry(0.34, 0.2, 0.16), mat.driver);
  ba.position.set(0.4, 0.3, 0);
  const ba2 = new Mesh(new BoxGeometry(0.22, 0.14, 0.12), mat.driver);
  ba2.position.set(0.42, -0.28, 0);
  drivers.add(dd, ba, ba2);
  drivers.position.z = -0.3;
  add('drivers', 0.2, drivers, mat.driver);

  // 05 crossover: a small board with two components
  const cross = new Group();
  const pcb = new Mesh(new BoxGeometry(0.7, 0.42, 0.03), mat.board);
  const c1 = new Mesh(new BoxGeometry(0.12, 0.08, 0.05), mat.chip);
  c1.position.set(-0.16, 0.06, 0.04);
  const c2 = new Mesh(new BoxGeometry(0.1, 0.06, 0.05), mat.chip);
  c2.position.set(0.14, -0.08, 0.04);
  cross.add(pcb, c1, c2);
  cross.position.z = -0.08;
  add('crossover', 1.15, cross, mat.board, mat.chip);

  // callout order follows the DOM (shell, faceplate, nozzle, drivers, crossover)
  const order = callouts.map((el) => parts.find((p) => p.id === el.dataset.part)!);
  const rest = parts.map((p) => p.node.position.z);
  scene.add(model);

  let width = 0;
  let height = 0;
  const resize = () => {
    width = view.clientWidth;
    height = view.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(view);
  resize();

  const dim = parseFloat(css('--dim')) || 0.35;
  const world = new Vector3();
  const start = performance.now();

  const frame = () => {
    const { p, explode, active } = state;
    const portrait = width < height;
    const t = state.lean ? 0 : (performance.now() - start) / 1000;

    // hero: model sits right (or low on portrait); sequence: centred
    const heroness = 1 - Math.min(1, p / 0.1);
    // visible half-width of the view at the model's depth
    const halfW = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
    model.position.x = portrait ? 0 : lerp(halfW * 0.22, halfW * 0.6, heroness);
    model.position.y = portrait ? lerp(0.5, -1.5, heroness) : 0;
    const scale = (portrait ? 0.62 : Math.min(1, halfW / 3.4)) * lerp(0.9, 0.82, heroness);
    // exploded, the parts span about 5 model units; shrink to fit the view width
    const fit = Math.min(scale, (halfW * 2 * 0.86) / 5);
    model.scale.setScalar(lerp(scale, fit, explode));

    // rotation: slow idle drift plus scroll-driven turn; exploded view is
    // seen side-on so the parts read along one axis
    const side = -1.05;
    const turn = Math.min(1, p / 0.1) * Math.PI * 2;
    model.rotation.y = lerp(-0.85 + Math.sin(t * 0.4) * 0.12 + turn, side + Math.sin(t * 0.3) * 0.04, explode);
    model.rotation.x = lerp(0.25, 0.18, explode);

    parts.forEach((part, i) => {
      part.node.position.z = rest[i] + part.offset * explode;
      const lit = active === -1 || order[active] === part;
      for (const m of part.materials) m.opacity = lerp(m.opacity, lit ? 1 : dim, 0.18);
    });

    renderer.render(scene, camera);

    // leader line from the active part to its callout card
    const on = active !== -1 && explode > 0.9;
    leader.classList.toggle('is-on', on);
    if (on) {
      order[active].node.getWorldPosition(world).project(camera);
      const x = (world.x * 0.5 + 0.5) * width;
      const y = (-world.y * 0.5 + 0.5) * height;
      const card = callouts[active].getBoundingClientRect();
      const box = view.getBoundingClientRect();
      leaderDot.setAttribute('cx', x.toFixed(1));
      leaderDot.setAttribute('cy', y.toFixed(1));
      leaderLine.setAttribute('x1', x.toFixed(1));
      leaderLine.setAttribute('y1', y.toFixed(1));
      leaderLine.setAttribute('x2', (card.left - box.left + 4).toFixed(1));
      leaderLine.setAttribute('y2', (card.top - box.top).toFixed(1));
    }
  };

  stage.addEventListener('stage:frame', frame);
  frame();
  document.documentElement.classList.add('stage-ready');
}
