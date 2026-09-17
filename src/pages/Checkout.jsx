import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Checkout() {
  const { items, subtotal, count } = useCart();
  const [placed, setPlaced] = useState(false);

  if (count === 0 && !placed) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border text-muted-foreground">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-600 tracking-tight">Nothing to check out.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Orders are not open yet. Explore the concept or join the early access list.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to shop <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Checkout</p>
        <h1 className="mt-4 font-heading text-3xl font-700 tracking-tight">Checkout is a preview.</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Echelis One is still in development. Real checkout activates when pre-orders open. Join the early access list to be notified first.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Go home
          </Link>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium hover:border-primary">
            Continue browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Checkout</p>
      <h1 className="mt-3 font-heading text-3xl font-700 tracking-tight md:text-4xl">Almost there</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Payment is not live yet. This page previews the flow for when Founders Edition pre-orders open.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
          }}
        >
          <fieldset className="rounded-sm border border-border bg-card p-6 space-y-4">
            <legend className="px-1 font-heading text-lg font-600 tracking-tight">Contact</legend>
            <input required type="email" placeholder="Email" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </fieldset>
          <fieldset className="rounded-sm border border-border bg-card p-6 space-y-4">
            <legend className="px-1 font-heading text-lg font-600 tracking-tight">Shipping</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="First name" className="rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <input required placeholder="Last name" className="rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <input required placeholder="Address" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <div className="grid gap-4 sm:grid-cols-3">
              <input required placeholder="City" className="rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <input required placeholder="State" className="rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              <input required placeholder="ZIP" className="rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </fieldset>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Place preview order <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <aside className="h-fit rounded-sm border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-600 tracking-tight">Order summary</h2>
          <ul className="mt-5 divide-y divide-border">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between gap-4 py-3 text-sm">
                <span>{item.name} × {item.qty}</span>
                <span className="font-mono-tech text-muted-foreground">{item.price ? `$${item.price}` : '—'}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
            <span>Subtotal</span>
            <span className="font-mono-tech">${subtotal.toFixed(2)}</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No charge will be made. Checkout activates at launch.</p>
        </aside>
      </div>
    </div>
  );
}
