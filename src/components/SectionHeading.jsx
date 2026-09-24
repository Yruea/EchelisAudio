import React from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({ eyebrow, title, description, align = 'left', className }) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl', className)}>
      {eyebrow && (
        <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-primary/60" />
          <span className="font-mono-tech text-xs uppercase tracking-widest text-primary">{eyebrow}</span>
        </div>
      )}
      <h2 className="mt-4 font-heading text-3xl font-600 tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}