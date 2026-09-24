import React, { useState } from 'react';
import { explodedComponents } from '@/lib/data';
import { cn } from '@/lib/utils';

// Line-art glyph for each IEM component, drawn as blueprint linework.
function Glyph({ id }) {
  const common = {
    fill: 'none',
    stroke: 'hsl(var(--primary))',
    strokeWidth: 1.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (id) {
    case 'ear-tip':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <path d="M20 20 C20 14, 60 14, 60 20 L60 60 C60 70, 20 70, 20 60 Z" {...common} />
          <path d="M28 28 C28 24, 52 24, 52 28 L52 56 C52 62, 28 62, 28 56 Z" {...common} opacity="0.6" />
          <path d="M40 30 L40 54" {...common} opacity="0.4" />
        </svg>
      );
    case 'nozzle':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <rect x="28" y="22" width="24" height="36" rx="3" {...common} />
          <path d="M28 30 L52 30 M28 50 L52 50" {...common} opacity="0.5" />
          <circle cx="40" cy="40" r="3" {...common} />
          <path d="M34 58 L34 64 M46 58 L46 64" {...common} opacity="0.5" />
        </svg>
      );
    case 'shell':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <path d="M22 40 C22 24, 40 20, 52 26 C62 31, 62 49, 52 56 C44 61, 30 60, 24 52 C20 47, 20 44, 22 40 Z" {...common} />
          <path d="M40 28 C48 28, 52 34, 52 40 C52 48, 46 52, 40 52" {...common} opacity="0.5" />
          <circle cx="40" cy="40" r="3" {...common} />
        </svg>
      );
    case 'chamber':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <circle cx="40" cy="40" r="22" {...common} />
          <circle cx="40" cy="40" r="14" {...common} opacity="0.6" />
          <circle cx="40" cy="40" r="6" {...common} opacity="0.4" />
          <path d="M40 18 L40 24 M40 56 L40 62 M18 40 L24 40 M56 40 L62 40" {...common} opacity="0.4" />
        </svg>
      );
    case 'driver':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <rect x="28" y="24" width="24" height="32" rx="2" {...common} />
          <path d="M34 24 L34 18 L46 18 L46 24" {...common} />
          <path d="M34 56 L34 62 L46 62 L46 56" {...common} />
          <path d="M32 32 C36 36, 44 36, 48 32 M32 40 C36 44, 44 44, 48 40 M32 48 C36 52, 44 52, 48 48" {...common} opacity="0.6" />
        </svg>
      );
    case 'cable':
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <circle cx="28" cy="40" r="8" {...common} />
          <circle cx="28" cy="40" r="3" {...common} opacity="0.6" />
          <path d="M36 40 C44 36, 44 44, 52 40 C58 37, 58 43, 64 40" {...common} />
          <path d="M36 44 C44 40, 44 48, 52 44" {...common} opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ExplodedIEM() {
  const [active, setActive] = useState(null);

  return (
    <div className="relative">
      {/* Axis line */}
      <div className="absolute left-0 right-0 top-[88px] hidden h-px bg-primary/20 md:block" />
      <div className="absolute left-0 right-0 top-[88px] hidden md:block">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-between">
            {explodedComponents.map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-mono-tech text-[9px] text-primary/40">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {explodedComponents.map((c, i) => (
          <button
            key={c.id}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              'group relative flex flex-col items-center bg-card p-6 text-left transition-colors',
              active === c.id ? 'bg-secondary/40' : 'hover:bg-secondary/20'
            )}
          >
            <span className="font-mono-tech text-[10px] text-primary/50">
              0{i + 1}
            </span>
            <div className="relative my-4 h-20 w-20">
              <div className="absolute inset-0 blueprint-grid-fine opacity-40" />
              <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
                <Glyph id={c.id} />
              </div>
            </div>
            <p className="font-heading text-sm font-600 tracking-tight text-foreground">{c.name}</p>
            <p className="mt-1 font-mono-tech text-[10px] text-primary/70">{c.spec}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
            <span
              className={cn(
                'mt-4 h-px w-8 transition-all duration-300',
                active === c.id ? 'bg-primary w-12' : 'bg-border'
              )}
            />
          </button>
        ))}
      </div>

      <p className="mt-6 text-center font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
        Concept render · components &amp; specifications subject to refinement
      </p>
    </div>
  );
}