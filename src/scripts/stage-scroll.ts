// Scroll controller for the pinned stage. Small and eager: it drives the
// hero fade, the active callout and the end card from scroll position. The
// 3D scene (stage-3d.ts) is loaded lazily and reads the same state.

export interface StageState {
  /** 0..1 progress through the whole pinned section (smoothed) */
  p: number;
  /** 0..1 how far the model is exploded */
  explode: number;
  /** index of the highlighted part, or -1 */
  active: number;
  visible: boolean;
  /** true on small screens: no idle motion, render only when something changes */
  lean: boolean;
}

// Timeline, as fractions of total scroll progress.
export const T = {
  heroOut: [0.03, 0.1],
  explode: [0.1, 0.22],
  callouts: [0.22, 0.82],
  reassemble: [0.82, 0.94],
} as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const span = (v: number, [a, b]: readonly [number, number]) => clamp01((v - a) / (b - a));
// ease-mech as a function: fast start, firm stop, no overshoot
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function initStageScroll() {
  const root = document.documentElement;
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  if (!stage || !root.classList.contains('stage-on')) return;

  const hero = stage.querySelector<HTMLElement>('[data-stage-hero]')!;
  const anatomy = stage.querySelector<HTMLElement>('.stage__anatomy')!;
  const callouts = [...stage.querySelectorAll<HTMLElement>('.callout')];
  const end = stage.querySelector<HTMLElement>('.stage__end')!;
  const lean = matchMedia('(max-width: 47.99rem)').matches;
  const state: StageState = { p: 0, explode: 0, active: -1, visible: true, lean };
  let target = 0;
  let raf = 0;
  // frames to keep rendering after scrolling stops, so fades can finish
  const SETTLE_FRAMES = 40;
  let settle = SETTLE_FRAMES;

  const measure = () => {
    const rect = stage.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    target = travel > 0 ? clamp01(-rect.top / travel) : 0;
  };

  const apply = () => {
    const { p } = state;
    const heroO = 1 - span(p, T.heroOut);
    hero.style.setProperty('--hero-o', heroO.toFixed(3));
    hero.classList.toggle('is-gone', heroO === 0);
    hero.inert = heroO === 0;

    state.explode = ease(span(p, T.explode)) * (1 - ease(span(p, T.reassemble)));
    const c = span(p, T.callouts);
    const inCallouts = p >= T.callouts[0] && p < T.callouts[1];
    state.active = inCallouts ? Math.min(callouts.length - 1, Math.floor(c * callouts.length)) : -1;
    callouts.forEach((el, i) => el.classList.toggle('is-active', i === state.active));
    anatomy.classList.toggle('is-on', p >= T.explode[0] && p < T.reassemble[1]);
    const atEnd = p >= T.reassemble[1];
    end.classList.toggle('is-on', atEnd);
    end.inert = !atEnd;
  };

  const tick = () => {
    raf = 0;
    // smooth toward the scroll target so the motion feels weighted
    const delta = target - state.p;
    state.p = Math.abs(delta) < 0.0005 ? target : state.p + delta * 0.14;
    settle = state.p === target ? settle - 1 : SETTLE_FRAMES;
    apply();
    stage.dispatchEvent(new CustomEvent('stage:frame', { detail: state }));
    // desktop keeps a slow idle drift while visible; lean mode stops once settled
    if (state.visible && (!lean || settle > 0)) raf = requestAnimationFrame(tick);
  };
  const kick = () => {
    measure();
    settle = SETTLE_FRAMES;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting;
    if (state.visible) kick();
  }).observe(stage);
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick);
  measure();
  state.p = target;
  apply();

  // Load the 3D scene lazily, without blocking the page.
  const load = () =>
    import('./stage-3d')
      .then((m) => m.initStage3D(stage, state))
      .catch(() => {
        /* WebGL failed: the poster stays and the callouts still work */
      });
  // The poster is shown until then. Loading waits for the first sign of a
  // person (pointer, touch, scroll or key) so it never competes with first
  // paint.
  const events = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown'] as const;
  const start = () => {
    events.forEach((name) => removeEventListener(name, start));
    load().then(kick);
  };
  events.forEach((name) => addEventListener(name, start, { passive: true, once: true }));
}
