import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { journalPosts } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Journal() {
  const [featured, ...rest] = journalPosts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the workbench."
        description="Thoughts on tuning, prototypes, materials, and what it takes to build a monitor from nothing. Written by the people making it."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          {/* Featured */}
          <Reveal>
            <Link to={`/journal/${featured.slug}`} className="group grid gap-8 overflow-hidden rounded-sm border border-border bg-card p-6 md:grid-cols-2 md:p-8 hover:border-primary/50 transition-colors">
              <div className="relative min-h-[220px] overflow-hidden rounded-sm border border-border bg-background">
                <div className="absolute inset-0 blueprint-grid-fine opacity-40" />
                <div className="relative flex h-full min-h-[220px] items-center justify-center">
                  <span className="font-heading text-6xl font-700 tracking-tight text-primary/20">{featured.category}</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span className="text-primary">{featured.category}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <p className="mt-5 font-mono-tech text-xs text-muted-foreground">{featured.date}</p>
              </div>
            </Link>
          </Reveal>

          {/* Rest */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link to={`/journal/${post.slug}`} className="group flex h-full flex-col rounded-sm border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary">{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-600 tracking-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-mono-tech text-xs text-muted-foreground">{post.date}</span>
                    <span className="inline-flex items-center gap-1 font-mono-tech text-xs uppercase tracking-widest text-primary">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-sm border border-dashed border-border p-10 text-center">
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">More soon</p>
            <p className="mt-3 text-sm text-muted-foreground">We publish as we build. Join the early access list to never miss a post.</p>
          </div>
        </div>
      </section>
    </>
  );
}