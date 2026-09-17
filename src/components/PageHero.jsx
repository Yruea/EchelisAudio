import React from 'react';
import BlueprintGrid from '@/components/BlueprintGrid';

export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 pb-14 md:pt-36 md:pb-20">
      <BlueprintGrid />
      <div className="relative mx-auto max-w-7xl px-4">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary/60" />
            <span className="font-mono-tech text-xs uppercase tracking-widest text-primary">{eyebrow}</span>
          </div>
        )}
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-700 leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}