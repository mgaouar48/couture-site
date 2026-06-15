"use client";

import React from "react";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/cart-drawer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md antialiased texture-linen relative overflow-x-hidden">
        {children}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

