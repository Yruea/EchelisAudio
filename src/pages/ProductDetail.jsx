import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { ArrowRight, ArrowLeft, Check, Minus, Plus, ChevronDown } from 'lucide-react';
import { products, IMAGES } from '@/lib/data';
import WaitlistForm from '@/components/WaitlistForm';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';
import { cn } from '@/lib/utils';

function SpecRow({ spec }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border py-3.5">
      <span className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">{spec.label}</span>
      <span className={cn('text-right text-sm', spec.tentative ? 'text-muted-foreground italic' : 'text-foreground')}>
        {spec.value}
        {spec.tentative && <span className="ml-1 text-[10px] text-primary/70">TBC</span>}
      </span>
    </div>
  );
}

function Accordion({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-heading text-base font-600 tracking-tight">{item.q}</span>
        <ChevronDown className={cn('h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-[max-height] duration-300', open ? 'max-h-60' : 'max-h-0')}>
        <p className="pb-5 pr-8 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) || products[0];
  const [activeImg, setActiveImg] = useState(0);
  const comingSoon = product.status === 'in-development';

  return (
    <>
      {/* Hero header band */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="absolute inset-0 grain" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center md:py-24">
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-primary">
            {product.category} · {product.statusLabel}
          </p>
          <h1
            style={{ fontFamily: "'Michroma', sans-serif" }}
            className="mt-6 text-3xl uppercase tracking-[0.18em] text-foreground sm:text-5xl md:text-6xl"
          >
            {product.name}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
            {product.tagline}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-2 font-mono-tech text-xs text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-sm border border-border bg-card">
              <Image
                src={product.gallery[activeImg]}
                alt={`${product.name} — concept render`}
                fittingType="fit"
                className="aspect-square w-full"
              />
              <div className="absolute inset-0 blueprint-grid-fine opacity-20" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm border border-cyan/40 bg-background/70 px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-cyan">{product.statusLabel}</span>
              </div>
              <p className="absolute bottom-3 right-3 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground/80">
                Concept render
              </p>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'relative overflow-hidden rounded-sm border transition-colors',
                    activeImg === i ? 'border-primary' : 'border-border hover:border-foreground/30'
                  )}
                >
                  <Image src={g} alt="" fittingType="fit" className="aspect-square w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">{product.category}</p>
            <h1 className="mt-3 font-heading text-3xl font-700 tracking-tight md:text-4xl">
              {product.name}
              <span className="block text-muted-foreground font-500 text-xl mt-1">— {product.edition}</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{product.tagline}</p>

            {/* Reservation counter */}
            <div className="mt-8 rounded-sm border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Phase 01 · Early Access</span>
                <span className="font-mono-tech text-sm text-foreground">{product.reservedPct}% reserved</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${product.reservedPct}%` }} />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              {comingSoon ? (
                <div>
                  <p className="mb-3 font-mono-tech text-xs uppercase tracking-widest text-cyan">Notify me when available</p>
                  <WaitlistForm source="product" productSlug={product.slug} cta="Reserve a Spot" variant="inline" />
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-sm border border-border">
                    <button className="p-3 text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
                    <span className="w-10 text-center text-sm">1</span>
                    <button className="p-3 text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button className="flex-1 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Add to Cart — ${product.price}
                  </button>
                </div>
              )}
            </div>

            {/* Quick highlights */}
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
              {[
                { k: 'Tuning', v: 'By intention' },
                { k: 'Shell', v: 'Comfort-first' },
                { k: 'Cable', v: 'Detachable · MMCX' },
                { k: 'Profile', v: 'Long-session' },
              ].map((x) => (
                <div key={x.k} className="bg-card p-4">
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">{x.k}</p>
                  <p className="mt-1 text-sm text-foreground">{x.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story + detail sections */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <BlueprintGrid />
        <div className="relative mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Product Story</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">Why Echelis One exists.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{product.story}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Tuning Philosophy</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">The sound we are chasing.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{product.tuningPhilosophy}</p>
          </Reveal>
        </div>
      </section>

      {/* Concept details */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {[
              { title: 'Comfort-first shell', body: product.shellDesign },
              { title: 'Detachable cable', body: product.cable },
              { title: 'Driver architecture', body: product.driverArchitecture, note: 'Subject to refinement' },
              { title: 'Listening profile', body: product.listeningProfile },
            ].map((d) => (
              <div key={d.title} className="bg-card p-8">
                <h3 className="font-heading text-lg font-600 tracking-tight">{d.title}</h3>
                {d.note && <p className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-primary/70">{d.note}</p>}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Technical Specs</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">Subject to refinement.</h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              These figures reflect our current development direction. Anything marked <span className="text-primary/70">TBC</span> is still being validated through prototyping.
            </p>
          </div>
          <div>
            {product.specs.map((s) => (
              <SpecRow key={s.label} spec={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Fit guidance + what's included */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Fit Guidance</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">A proper seal is everything.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.fitGuidance}</p>
          </div>
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">What's Included</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">In the box.</h2>
            <ul className="mt-5 space-y-3">
              {product.whatsIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">Questions, answered honestly.</h2>
          <div className="mt-8">
            {product.faqs.map((f) => (
              <Accordion key={f.q} item={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews placeholder */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border py-20 text-center">
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Reviews</p>
            <h3 className="mt-4 font-heading text-xl font-600 tracking-tight">No reviews yet — the product isn't out.</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Reviews will appear here once Echelis One reaches listeners. Join the early access list to be among the first.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-600 tracking-tight md:text-3xl">Related</h2>
            <Link to="/shop" className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-primary hover:underline">
              Back to shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 rounded-sm border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            More products are on the roadmap. <Link to="/journal" className="text-primary hover:underline">Follow the journal</Link> for updates.
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link to="/shop" className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to all products
          </Link>
        </div>
      </div>
    </>
  );
}