import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductCard({ product, compact = false }) {
  const comingSoon = product.status === 'in-development';
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/50"
    >
      <div className={cn('relative aspect-[4/3] overflow-hidden bg-background', compact && 'aspect-square')}>
        <Image
          src={product.image}
          alt={`${product.name} — concept render`}
          fittingType="fit"
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 blueprint-grid-fine opacity-30" />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-cyan/40 bg-background/70 px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-widest text-cyan backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
            {product.statusLabel}
          </span>
        </div>
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono-tech text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <h3 className="mt-2 font-heading text-xl font-600 tracking-tight">
          {product.name}
          <span className="text-muted-foreground font-400"> — {product.edition}</span>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono-tech text-sm text-muted-foreground">
            {comingSoon ? 'Notify me' : product.price ? `$${product.price}` : '—'}
          </span>
          <span className="font-mono-tech text-xs uppercase tracking-widest text-primary group-hover:underline">
            View concept
          </span>
        </div>
      </div>
    </Link>
  );
}