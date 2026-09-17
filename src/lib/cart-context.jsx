import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('echelis_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem('echelis_saved');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('echelis_cart', JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem('echelis_saved', JSON.stringify(saved));
  }, [saved]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug: product.slug, name: product.name, edition: product.edition, price: product.price, image: product.image, qty }];
    });
  };

  const removeItem = (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const updateQty = (slug, qty) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const saveForLater = (slug) => {
    const item = items.find((i) => i.slug === slug);
    if (item && !saved.find((s) => s.slug === slug)) {
      setSaved((prev) => [...prev, item]);
    }
    removeItem(slug);
  };
  const moveToCart = (slug) => {
    const item = saved.find((i) => i.slug === slug);
    if (item) {
      addItem(item, 1);
      setSaved((prev) => prev.filter((i) => i.slug !== slug));
    }
  };
  const removeSaved = (slug) => setSaved((prev) => prev.filter((i) => i.slug !== slug));

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, saved, addItem, removeItem, updateQty, clear, saveForLater, moveToCart, removeSaved, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};