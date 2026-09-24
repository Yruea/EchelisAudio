import React from 'react';
import { cn } from '@/lib/utils';

// Decorative blueprint grid + radial vignette for section backgrounds.
export default function BlueprintGrid({ fine = false, className, vignette = true }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className={cn('absolute inset-0', fine ? 'blueprint-grid-fine' : 'blueprint-grid')} />
      {vignette && (
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)' }}
        />
      )}
    </div>
  );
}