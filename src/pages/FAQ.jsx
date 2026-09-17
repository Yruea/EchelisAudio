import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import { faqs } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently asked questions."
        description="Straight answers about where we are, what is confirmed, and what is still being decided."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                  <span className="font-heading text-base font-600 tracking-tight">{f.q}</span>
                  <ChevronDown className={cn('h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform', open === i && 'rotate-180')} />
                </button>
                <div className={cn('overflow-hidden transition-[max-height] duration-300', open === i ? 'max-h-60' : 'max-h-0')}>
                  <p className="pb-5 pr-8 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-sm border border-border bg-card p-8 text-center">
            <h2 className="font-heading text-xl font-600 tracking-tight">Still have a question?</h2>
            <p className="mt-3 text-sm text-muted-foreground">We read every message and reply as soon as we can.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}