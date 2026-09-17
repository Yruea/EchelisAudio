import React from 'react';
import PageHero from '@/components/PageHero';

export default function LegalLayout({ eyebrow, title, description, lastUpdated, children }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          {lastUpdated && (
            <p className="mb-10 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">
              Last updated · {lastUpdated}
            </p>
          )}
          <div className="space-y-10">{children}</div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-600 tracking-tight">{heading}</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}