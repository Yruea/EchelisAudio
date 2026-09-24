import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export default function ResetPassword() {
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-20">
      <div className="rounded-sm border border-border bg-card p-8 md:p-10">
        <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Account</p>
        <h1 className="mt-3 font-heading text-2xl font-700 tracking-tight">Set a new password</h1>

        {done ? (
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-sm border border-cyan/40 bg-cyan/5 px-4 py-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan/15 text-cyan"><Check className="h-4 w-4" /></span>
              <p className="text-sm">Your password has been reset. You can sign in with your new password.</p>
            </div>
            <Link to="/signin" className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-primary hover:underline">
              Go to sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <div>
              <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">New password</label>
              <input type="password" className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" />
            </div>
            <div>
              <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Confirm password</label>
              <input type="password" className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" />
            </div>
            <button className="w-full rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Reset password</button>
          </form>
        )}
      </div>
    </div>
  );
}