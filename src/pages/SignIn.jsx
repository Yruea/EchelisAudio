import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-20">
      <div className="rounded-sm border border-border bg-card p-8 md:p-10">
        <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Account</p>
        <h1 className="mt-3 font-heading text-2xl font-700 tracking-tight">Sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Accounts open at launch. Until then, joining the early access list is the best way to stay connected.
        </p>

        <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="you@email.com" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="font-mono-tech text-xs uppercase tracking-widest text-muted-foreground">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
            </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" />
          </div>
          <button className="group flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Lock className="h-4 w-4" /> Sign in
          </button>
        </form>

        <div className="mt-6 rounded-sm border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          New here? <Link to="/shop" className="text-primary hover:underline">Join the early access list</Link> instead.
        </div>
      </div>
      <p className="mt-6 text-center font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
        Authentication activates at launch
      </p>
    </div>
  );
}