import React from 'react';
import { Link } from 'react-router-dom';
import WaitlistForm from '@/components/WaitlistForm';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/shop' },
      { label: 'Echelis One', to: '/product/echelis-one-founders-edition' },
      { label: 'Cables', to: '/shop' },
      { label: 'Ear Tips', to: '/shop' },
      { label: 'Accessories', to: '/shop' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How It Works', to: '/engineering' },
      { label: 'Journal', to: '/journal' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Shipping & Returns', to: '/shipping-returns' },
      { label: 'Warranty', to: '/warranty' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
];

const socials = ['Instagram', 'YouTube', 'X / Twitter', 'Discord'];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Newsletter */}
        <div className="grid gap-10 border-b border-border py-16 md:grid-cols-2 md:py-20">
          <div className="max-w-md">
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Early Access</p>
            <h2 className="mt-4 font-heading text-2xl font-600 tracking-tight md:text-3xl">
              Hear it before it exists.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Development updates, prototype notes, and first access when pre-orders open. No spam — only signal.
            </p>
          </div>
          <div className="md:pl-8 md:border-l md:border-border">
            <WaitlistForm source="footer" />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="font-heading text-lg font-700 tracking-tight">
              Echelis<span className="text-primary">Audio</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Precision-built in-ear monitors for a more intimate relationship with sound.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-foreground/80 hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border py-6">
          <span className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Connect</span>
          {socials.map((s) => (
            <span key={s} className="text-sm text-foreground/70 hover:text-primary cursor-default transition-colors">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Big logotype */}
      <div className="select-none px-4 pb-8 pt-4">
        <div
          className="font-heading font-700 tracking-tight leading-none text-transparent"
          style={{
            WebkitTextStroke: '1px hsl(var(--primary) / 0.35)',
            fontSize: 'clamp(3rem, 14vw, 12rem)',
          }}
          aria-hidden="true"
        >
          ECHELIS
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-tech text-xs text-muted-foreground">
            © {new Date().getFullYear()} EchelisAudio. All rights reserved.
          </p>
          <p className="font-mono-tech text-xs text-muted-foreground">
            Concept renders · product in development
          </p>
        </div>
      </div>
    </footer>
  );
}