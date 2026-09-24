import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import WaitlistForm from '@/components/WaitlistForm';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import BlueprintGrid from '@/components/BlueprintGrid';
import { IMAGES, products, principles, journalPosts } from '@/lib/data';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.heroIem}
            alt="Echelis One — concept render"
            fittingType="fill"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          <BlueprintGrid className="opacity-40" />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:pb-24 md:pt-20">
          <Reveal>
            <p className="font-heading text-4xl font-700 tracking-tight text-foreground sm:text-5xl md:text-7xl">
              Echelis<span className="text-primary">Audio</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-2xl font-heading text-2xl font-600 tracking-tight text-foreground/95 md:text-4xl">
              Innovating what you hear.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
              Precision-built in-ear monitors for a more intimate relationship with sound. Echelis One is in development.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 max-w-md">
              <WaitlistForm source="home_hero" variant="inline" />
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <Link
              to="/product/echelis-one-founders-edition"
              className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Explore the concept <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Principles</p>
            <h2 className="mt-4 max-w-2xl font-heading text-3xl font-600 tracking-tight md:text-4xl">
              Built for listeners who stay with the music.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full bg-card p-7">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">0{i + 1}</span>
                  <h3 className="mt-4 font-heading text-lg font-600 tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured product */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">In development</p>
              <h2 className="mt-4 font-heading text-3xl font-600 tracking-tight md:text-4xl">Echelis One</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Our first monitor — tuned for honesty, shaped for comfort, shared in public before it ships.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-primary hover:underline"
              >
                View shop <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journal teaser */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Journal</p>
            <h2 className="mt-4 font-heading text-3xl font-600 tracking-tight md:text-4xl">Notes from the lab.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journalPosts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link
                  to={`/journal/${post.slug}`}
                  className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-primary/50"
                >
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    {post.category} · {post.readTime}
                  </p>
                  <h3 className="mt-4 font-heading text-xl font-600 tracking-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <BlueprintGrid />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Early access</p>
            <h2 className="mt-4 font-heading text-3xl font-600 tracking-tight md:text-4xl">
              Be first when it ships.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Join the list for development updates, feedback invites, and priority access when pre-orders open.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-md">
              <WaitlistForm source="home_footer" variant="inline" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
