import React, { useMemo, useState } from 'react';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import WaitlistForm from '@/components/WaitlistForm';
import { categories, products } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Shop() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(() => {
    if (active === 'all') return products;
    const label = categories.find((c) => c.id === active)?.label;
    return products.filter((p) => p.category === label);
  }, [active]);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Concept catalog."
        description="Echelis One is still in development. Browse the concept, join the early access list, and help shape what ships."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            <button
              onClick={() => setActive('all')}
              className={cn(
                'rounded-sm border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-widest transition-colors',
                active === 'all'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  'rounded-sm border px-3 py-1.5 font-mono-tech text-[11px] uppercase tracking-widest transition-colors',
                  active === c.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                )}
              >
                {c.label}
                <span className="ml-2 opacity-60">{c.count}</span>
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-heading text-xl font-600 tracking-tight">Nothing in this category yet.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Cables, tips, and accessories will arrive with the Founders Edition.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <WaitlistForm source="shop_empty" variant="inline" />
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => (
                <Reveal key={product.slug} delay={i * 0.06}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
