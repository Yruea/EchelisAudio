import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname === '/' ? 'home' : location.pathname;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-4 font-heading text-3xl font-700 tracking-tight md:text-4xl">Page not found</h1>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        Nothing lives at <span className="font-mono-tech text-foreground">{pageName}</span>. It may have moved, or it may not exist yet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}
