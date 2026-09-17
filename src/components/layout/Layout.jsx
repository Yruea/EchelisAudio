import React from 'react';
import { Outlet } from 'react-router-dom';
import { CartProvider } from '@/lib/cart-context';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <CartProvider>
      <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}