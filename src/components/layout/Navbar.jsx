import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="EchelisAudio home">
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-primary/60" />
        <span className="absolute inset-[3px] rounded-full border border-primary/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
      </span>
      <span className="font-heading text-base font-700 tracking-tight">
        Echelis<span className="text-primary">Audio</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Wordmark />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'font-mono-tech text-xs tracking-wide uppercase transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/account"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height] duration-300',
          open ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'py-3 font-mono-tech text-sm tracking-wide uppercase border-b border-border/60',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}