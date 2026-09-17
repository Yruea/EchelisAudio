import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Cart() {
  const { items, updateQty, removeItem, saveForLater, subtotal, count } = useCart();

  const shipping = subtotal > 0 ? 0 : 0; // free at launch placeholder
  const tax = 0;
  const total = subtotal + shipping + tax;

  if (count === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border text-muted-foreground">
          <ShoppingBag className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-600 tracking-tight">Your cart is empty.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Echelis One is still in development. When it launches, you will find it here. Until then, join the early access list.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            View the concept <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/product/echelis-one-founders-edition" className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground hover:border-primary">
            Join the waitlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">Cart</p>
      <h1 className="mt-3 font-heading text-3xl font-700 tracking-tight md:text-4xl">Your selection</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Items */}
        <div className="divide-y divide-border rounded-sm border border-border">
          {items.map((item) => (
            <div key={item.slug} className="flex gap-4 p-5">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border border-border bg-card">
                <Image src={item.image} alt={item.name} fittingType="fit" className="h-full w-full" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-base font-600 tracking-tight">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.edition}</p>
                    <p className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                      SKU · EA-01-FE
                    </p>
                  </div>
                  <span className="font-mono-tech text-sm">{item.price ? `$${item.price}` : '—'}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-sm border border-border">
                    <button onClick={() => updateQty(item.slug, item.qty - 1)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-10 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.slug, item.qty + 1)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <button onClick={() => saveForLater(item.slug)} className="text-muted-foreground hover:text-primary">Save for later</button>
                    <button onClick={() => removeItem(item.slug)} className="inline-flex items-center gap-1 text-muted-foreground hover:text-destructive"><X className="h-3.5 w-3.5" /> Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-600 tracking-tight">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono-tech">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-mono-tech text-cyan">Free at launch</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-mono-tech">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border pt-3 text-base"><span>Total</span><span className="font-mono-tech font-600">${total.toFixed(2)}</span></div>
            </div>
            {/* Promo */}
            <div className="mt-6">
              <label className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">Promo code</label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input placeholder="Enter code" className="w-full rounded-sm border border-border bg-background py-2.5 pl-9 pr-3 text-sm focus:border-primary focus:outline-none" />
                </div>
                <button className="rounded-sm border border-border px-4 text-sm text-foreground hover:border-primary">Apply</button>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">Shipping &amp; tax confirmed at checkout</p>
          </div>
          <Link to="/shop" className="block text-center font-mono-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}