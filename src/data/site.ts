// Single source of truth for product facts and copy.
// RULE: never invent a spec. Unknown values stay `null` and carry a
// `[[SPEC: ...]]` placeholder id; the UI renders them as "To be confirmed".

export const site = {
  name: 'Echelis Audio',
  shortName: 'Echelis',
  url: 'https://www.echelisaudio.com',
  email: 'echelisaudio@gmail.com',
  founded: 'July 2026',
  teamSize: 2,
  description:
    'Echelis is two people building one in-ear monitor in the open. The Angosta One is in development. Join early access to follow the build.',
  formEndpoint: 'https://formspree.io/f/xoedjgob',
};

export const product = {
  name: 'Angosta One',
  slug: 'angosta-one',
  status: 'In development',
  type: 'Hybrid in-ear monitor',
};

export const nav = [
  { href: '/angosta-one', label: 'Angosta One' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

export interface Part {
  id: string;
  index: string;
  code: string;
  name: string;
  line: string;
  note: string;
}

// Exploded-view callouts. `line` is the one-sentence explanation for
// newcomers; `note` is the longer design note on the product page.
export const parts: Part[] = [
  {
    id: 'shell',
    index: '01',
    code: 'EA-01',
    name: 'Shell',
    line: 'The body. It sits in the bowl of your ear and holds everything else.',
    note: 'The shell decides how the monitor fits, how much outside noise it blocks, and how long you can wear it. Material and final shape are still being worked out.',
  },
  {
    id: 'faceplate',
    index: '02',
    code: 'EA-02',
    name: 'Faceplate',
    line: 'The outer cover, and the part everyone else sees.',
    note: 'The faceplate closes the shell and carries the wordmark. The finish is not decided.',
  },
  {
    id: 'nozzle',
    index: '03',
    code: 'EA-03',
    name: 'Nozzle',
    line: 'The short tube that carries sound into your ear. The ear tip fits over it.',
    note: 'Nozzle length, angle and diameter change both comfort and treble. These are set by measurement and are not final.',
  },
  {
    id: 'drivers',
    index: '04',
    code: 'EA-04',
    name: 'Drivers',
    line: 'Tiny speakers. They turn the signal from your player into sound.',
    note: 'The Angosta One is a hybrid. The current target is three drivers per side: one dynamic driver for bass and lower mids, one balanced armature for mids and upper mids, and one piezoelectric driver for treble and air. This is a prototype target and may change.',
  },
  {
    id: 'crossover',
    index: '05',
    code: 'EA-05',
    name: 'Crossover',
    line: 'A small circuit that sends low, middle and high notes to the driver best suited to each.',
    note: 'The crossover is where a hybrid is tuned. Its values depend on the final drivers, so they are still open.',
  },
];

export interface Spec {
  label: string;
  value: string | null;
  placeholder?: string;
}

export const specs: Spec[] = [
  { label: 'Type', value: product.type },
  { label: 'Status', value: product.status },
  { label: 'Driver configuration', value: '1 dynamic + 1 balanced armature + 1 piezo (current target)' },
  { label: 'Frequency response', value: null, placeholder: '[[SPEC: frequency response]]' },
  { label: 'Impedance', value: null, placeholder: '[[SPEC: impedance]]' },
  { label: 'Sensitivity', value: null, placeholder: '[[SPEC: sensitivity]]' },
  { label: 'Cable connector', value: '0.78 mm 2-pin, detachable' },
  { label: 'Shell material', value: null, placeholder: '[[SPEC: shell material]]' },
  { label: 'Faceplate finish', value: null, placeholder: '[[SPEC: faceplate finish]]' },
  { label: 'Nozzle material', value: null, placeholder: '[[SPEC: nozzle material]]' },
  { label: 'Price', value: null, placeholder: '[[SPEC: price]]' },
  { label: 'Ship date', value: null, placeholder: '[[SPEC: ship date]]' },
];

export const OPEN_VALUE = 'To be confirmed';

// [[COPY]] draft: three beats for "Why Echelis".
export const beats = [
  {
    title: 'Built in the open.',
    body: 'We publish the work while it is still work: what we tried, what failed, what changed.',
  },
  {
    title: 'One product.',
    body: 'Two people, one monitor. Nothing else is competing for our attention.',
  },
  {
    title: 'Unknowns stay visible.',
    body: 'If a number is not measured yet, the spec sheet says so. No estimates dressed up as facts.',
  },
];

export const team: { name: string | null; role: string | null }[] = [
  { name: 'Shane Ollek', role: 'Co-founder' },
  { name: 'Pranaav Makharia', role: 'Co-founder' },
];

export const faqs = [
  {
    q: 'Can I buy the Angosta One?',
    a: 'Not yet. It is in development. There is no price and no ship date, and we will not take money until both exist.',
  },
  {
    q: 'What is an in-ear monitor?',
    a: 'An earphone that seals inside your ear canal. The seal blocks outside noise and lets very small drivers produce full sound, which is why musicians use them on stage.',
  },
  {
    q: 'What does "hybrid" mean?',
    a: 'A hybrid uses more than one kind of driver in each earpiece. A crossover splits the music so each driver plays the range it is best at. Our current target is one dynamic driver, one balanced armature and one piezoelectric driver per side.',
  },
  {
    q: 'What do I get from early access?',
    a: 'Email updates on the build before they appear anywhere else, and first notice when there is something to order.',
  },
  {
    q: 'Why are so many specs blank?',
    a: 'Because they are not final. We would rather show an empty row than a number we might have to take back.',
  },
];
