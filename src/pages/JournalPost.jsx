import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { journalPosts } from '@/lib/data';

export default function JournalPost() {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);
  const index = journalPosts.findIndex((p) => p.slug === slug);
  const next = journalPosts[index + 1];
  const prev = journalPosts[index - 1];

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <h1 className="font-heading text-2xl font-600 tracking-tight">Post not found.</h1>
        <Link to="/journal" className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to journal
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link to="/journal" className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Journal
          </Link>
        </div>
      </div>

      <header className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
          <h1 className="mt-5 font-heading text-3xl font-700 leading-tight tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </div>
      </header>

      <div className="border-y border-border bg-secondary/20">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="h-1 w-24 bg-primary/40" />
        </div>
      </div>

      <div className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 space-y-6">
          {post.content.map((para, i) => (
            <p key={i} className="text-base text-foreground/90 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {/* Prev / next */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-10 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link to={`/journal/${prev.slug}`} className="group rounded-sm border border-border p-5 hover:border-primary/50 transition-colors">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">Previous</span>
              <p className="mt-2 font-heading text-base font-600 tracking-tight group-hover:text-primary transition-colors">{prev.title}</p>
            </Link>
          ) : <div className="hidden sm:block" />}
          {next && (
            <Link to={`/journal/${next.slug}`} className="group rounded-sm border border-border p-5 text-right hover:border-primary/50 transition-colors sm:text-right">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">Next</span>
              <p className="mt-2 font-heading text-base font-600 tracking-tight group-hover:text-primary transition-colors">{next.title}</p>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}