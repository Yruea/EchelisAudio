import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import ExplodedIEM from '@/components/ExplodedIEM';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';
import { Image } from '@/components/ui/image';
import { philosophy, IMAGES, explodedComponents } from '@/lib/data';
import { Cpu, Ear, Layers, Hammer, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [Cpu, Ear, Layers, Hammer];

function Hotspot({ comp, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-primary/30 font-mono-tech text-xs text-primary">
          0{index + 1}
        </span>
        <span className="flex-1">
          <span className="block font-heading text-base font-600 tracking-tight">{comp.name}</span>
          <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-primary/70">{comp.spec}</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden pl-13 transition-[max-height] duration-300', open ? 'max-h-40' : 'max-h-0')}>
        <p className="pb-5 pl-13 text-sm text-muted-foreground leading-relaxed">{comp.desc}</p>
      </div>
    </div>
  );
}

export default function Engineering() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Engineering, made approachable."
        description="An in-ear monitor is not magic — it is a series of careful decisions about fit, seal, drivers, and tuning. Here is how we make them, and why."
      />

      {/* Philosophy blocks */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            {philosophy.map((p, i) => {
              const Icon = icons[i] || Layers;
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full bg-card p-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-primary/30 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-600 tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exploded interactive */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <BlueprintGrid />
        <div className="relative mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Interactive Blueprint</p>
            <h2 className="mt-4 font-heading text-3xl font-600 tracking-tight md:text-4xl">The monitor, taken apart.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Each component plays a specific role in the sound you hear. Hover the diagram, then expand a component below to understand what it does.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <ExplodedIEM />
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-start">
            <Reveal>
              <div className="overflow-hidden rounded-sm border border-border">
                <Image src={IMAGES.engineeringMacro} alt="Internal driver array — concept render" fittingType="fit" className="aspect-[4/3] w-full" />
                <p className="px-4 py-3 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                  Concept render · driver array &amp; crossover
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h3 className="font-heading text-lg font-600 tracking-tight">Component annotations</h3>
                <div className="mt-4">
                  {explodedComponents.map((c, i) => (
                    <Hotspot key={c.id} comp={c} index={i} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IEM basics */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">IEM Basics</p>
            <h2 className="mt-4 font-heading text-3xl font-600 tracking-tight md:text-4xl">The fundamentals, without the jargon.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {[
              { t: 'Fit', b: 'How the monitor sits in your ear. A good fit keeps the monitor secure and comfortable for hours.' },
              { t: 'Seal', b: 'The airtight closure the tip makes in your ear canal. Without it, bass disappears and isolation fails.' },
              { t: 'Isolation', b: 'How much outside sound is blocked. A proper seal passively isolates, so you listen at safer volumes.' },
              { t: 'Driver tuning', b: 'How each transducer is voiced and crossed over. Tuning decides whether a monitor sounds natural or forced.' },
              { t: 'Cables', b: 'The wire between monitor and source. Geometry and material affect durability and, marginally, sound.' },
              { t: 'Sound signature', b: 'The overall character — warm, neutral, bright. There is no "best," only what serves the music you love.' },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.05}>
                <div className="h-full bg-card p-7">
                  <h3 className="font-heading text-base font-600 tracking-tight">{x.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{x.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-border bg-secondary/20 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
            Disclaimer · Final specifications may evolve during development. Confirmed figures will be published before orders open.
          </p>
        </div>
      </section>
    </>
  );
}