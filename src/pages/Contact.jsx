import React, { useState } from 'react';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { base44 } from '@/api/base44Client';

const reasons = [
  'Product feedback',
  'Press',
  'Partnerships',
  'Support',
  'General inquiry',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', reason: reasons[0], message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in name, email, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      await base44.entities.ContactMessage.create(form);
      setStatus('success');
      setForm({ name: '', email: '', reason: reasons[0], message: '' });
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We read every message."
        description="Questions, feedback, press, or partnerships — tell us what you need. During development, this is one of the best ways to shape the product."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <a href="mailto:hello@echelisaudio.com" className="mt-2 block text-lg text-foreground hover:text-primary">
                  hello@echelisaudio.com
                </a>
              </div>
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Response time</p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  We typically reply within a few business days. Early access members get priority during prototyping.
                </p>
              </div>
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Prefer the list?</p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Join early access from the home page if you want product updates rather than a one-off reply.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {status === 'success' ? (
              <div className="flex items-start gap-4 rounded-sm border border-cyan/40 bg-cyan/5 p-8">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-heading text-xl font-600 tracking-tight">Message sent.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Thanks — we will get back to you soon.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 font-mono-tech text-xs uppercase tracking-widest text-primary hover:underline"
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-sm border border-border bg-card p-6 md:p-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Reason</label>
                  <select
                    name="reason"
                    value={form.reason}
                    onChange={onChange}
                    className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {reasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    className="mt-2 w-full resize-y rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="What should we know?"
                  />
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                >
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                  Send message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
