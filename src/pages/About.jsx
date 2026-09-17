import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';
import { IMAGES, principles } from '@/lib/data';

const timeline = [
  { phase: 'Phase 01', title: 'Concept & direction', status: 'Complete', body: 'We defined the sound we wanted and the listener we were building for.', done: true },
  { phase: 'Phase 02', title: 'Prototyping', status: 'In progress', body: 'Iterating on shells, drivers, and crossovers — measured and heard.', done: true },
  { phase: 'Phase 03', title: 'Community validation', status: 'Active', body: 'Sharing prototypes with the early access list and refining from feedback.', done: false },
  { phase: 'Phase 04', title: 'Pre-order & launch', status: 'Upcoming', body: 'Locking specifications, opening pre-orders to the early access list first.', done: false },
];

const values = [
  { t: 'Honesty', b: 'We say what we know and what we do not. No invented specs, no exaggerated claims.' },
  { t: 'Craft', b: 'Every decision is made by people who listen. Materials and methods chosen for longevity.' },
  { t: 'Community', b: 'The people who care enough to follow early shape the product that ships.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small team, building something we wished existed."
        description="EchelisAudio is an early-stage company making in-ear monitors for listeners who care deeply about detail, comfort, and an emotional connection to music."
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-sm border border-border">
              <Image src={IMAGES.materials} alt="Materials study — concept render" fittingType="fit" className="aspect-[4/3] w-full" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Our story</p>
              <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">It started with a frustration.</h2>
              <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We are listeners first. We had spent years chasing monitors that impressed in the first minute and fatigued in the fiftieth —
                  and we kept wondering why comfort, honesty, and longevity seemed like afterthoughts in a category built for people who care about sound.
                </p>
                <p>
                  EchelisAudio is our answer. We are early, small, and honest about it. We are building our first monitor in the open,
                  with the community, because we believe the people who will wear it should help shape it.
                </p>
                <p>
                  We are not pretending to have a catalog. We have one product in development, a clear intention, and the patience to get it right.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission + values */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <BlueprintGrid />
        <div className="relative mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Mission</p>
            <h2 className="mt-4 max-w-3xl font-heading text-2xl font-600 tracking-tight md:text-4xl">
              To build in-ear monitors that disappear — physically and sonically — so nothing stands between you and the music.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="h-full bg-card p-8">
                  <h3 className="font-heading text-lg font-600 tracking-tight">{v.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design philosophy (principles reuse) */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Design Philosophy</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">The principles behind every decision.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full bg-card p-7">
                  <span className="font-mono-tech text-[10px] text-primary/60">0{i + 1}</span>
                  <h3 className="mt-2 font-heading text-base font-600 tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Development Timeline</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">Where we are.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.phase} delay={i * 0.08}>
                <div className="h-full bg-card p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-primary/70">{t.phase}</span>
                    <span className={`font-mono-tech text-[10px] uppercase tracking-widest ${t.done ? 'text-cyan' : 'text-muted-foreground'}`}>
                      {t.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-600 tracking-tight">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1), transparent 60%)' }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-700 tracking-tight md:text-4xl">Help shape our first release.</h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground leading-relaxed">
              If you care about how things sound, we want to hear from you. Join the early access list or send us a note.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Explore Echelis One <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-3.5 text-sm font-medium text-foreground hover:border-primary">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}