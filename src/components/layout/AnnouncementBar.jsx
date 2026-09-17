import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative z-50 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center gap-3 py-2 text-center">
          <span className="hidden sm:inline h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
          <p className="font-mono-tech text-[11px] sm:text-xs tracking-wide">
            Echelis One is in development — join the early access list.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium underline-offset-4 hover:underline"
          >
            <span className="hidden sm:inline">Reserve a spot</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary-foreground/70 hover:text-primary-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}