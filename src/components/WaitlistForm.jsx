const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';

import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WaitlistForm({
  source = 'general',
  productSlug = null,
  placeholder = 'Email address',
  cta = 'Join the Early Access List',
  variant = 'default', // 'default' | 'inline'
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      await db.entities.WaitlistEntry.create({ email, source, product_slug: productSlug });
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-sm border border-cyan/40 bg-cyan/5 px-4 py-4 cyan-glow">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan/15 text-cyan">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">You're on the list.</p>
          <p className="text-xs text-muted-foreground">We'll be in touch before anyone else.</p>
        </div>
      </div>
    );
  }

  const inline = variant === 'inline';

  return (
    <form onSubmit={submit} className={cn('w-full', inline && 'flex flex-col sm:flex-row gap-3')}>
      <div className={cn('relative', inline ? 'flex-1' : 'w-full')}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className={cn(
            'w-full rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60',
            'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors'
          )}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'group inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground',
          'hover:bg-primary/90 transition-colors disabled:opacity-60',
          inline ? 'sm:w-auto' : 'mt-3 w-full'
        )}
      >
        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        {cta}
      </button>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </form>
  );
}