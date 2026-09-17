import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-20">
      <div className="rounded-sm border border-border bg-card p-8 md:p-10">
        <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Account</p>
        <h1 className="mt-3 font-heading text-2xl font-700 tracking-tight">Reset password</h1>

        {sent ? (
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-sm border border-cyan/40 bg-cyan/5 px-4 py-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan/15 text-cyan"><Check className="h-4 w-4" /></span>
              <p className="text-sm">If an account exists for that email, a reset link is on its way.</p>
            </div>
            <Link to="/signin" className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-primary hover:underline">
              Back to sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm text-muted-foreground">Enter your email and we will send you a link to reset your password.</p>
            <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="you@email.com" />
              </div>
              <button className="w-full rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Send reset link</button>
            </form>
          </>
        )}
      </div>
      <p className="mt-6 text-center font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">Authentication activates at launch</p>
    </div>
  );
}