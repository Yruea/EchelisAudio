import React from 'react';
import { Link } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';

export default function Account() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-4 py-20">
      <div className="rounded-sm border border-border bg-card p-8 md:p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border text-muted-foreground">
          <User className="h-6 w-6" />
        </div>
        <p className="mt-6 font-mono-tech text-xs uppercase tracking-widest text-primary">Account</p>
        <h1 className="mt-3 font-heading text-2xl font-700 tracking-tight md:text-3xl">
          Accounts open at launch.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Order history, saved addresses, and Founders Edition serials will live here. Until then, join the early access list or sign in when authentication is enabled.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/signin"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign in <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium hover:border-primary"
          >
            Join early access
          </Link>
        </div>
      </div>
    </div>
  );
}
