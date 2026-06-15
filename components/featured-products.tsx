import React, { useEffect, useState } from "react";
import { ALL_PRODUCTS, Product } from "@/lib/shop-data";
import ProductCard from "./product-card";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      setProducts(JSON.parse(stored).slice(0, 6));
    } else {
      setProducts(ALL_PRODUCTS.slice(0, 6));
    }
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pb-12 md:pb-20 overflow-hidden" id="produits">

      {/* Decorative floating elements */}
      <div className="pointer-events-none select-none hidden md:block">
        {/* ... (SVG content unchanged) ... */}
        <div className="absolute -top-4 -left-4 opacity-[0.07] animate-float-slow">
          <svg viewBox="0 0 24 24" className="w-28 h-28 text-primary fill-none stroke-current" strokeWidth="1.2">
            <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12"/>
          </svg>
        </div>
        <div className="absolute top-8 -right-2 opacity-[0.08] animate-float-medium">
          <svg className="w-20 h-28 text-[#bd1e7c] fill-current" viewBox="0 0 24 32">
            <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.7"/>
            <ellipse cx="12" cy="5" rx="10" ry="3" fill="#ffdbe8"/>
            <ellipse cx="12" cy="27" rx="10" ry="3" fill="#ffdbe8"/>
            <path d="M4 11h16M4 16h16M4 21h16" stroke="#fff" strokeWidth="1.2"/>
          </svg>
        </div>
        <div className="absolute bottom-12 -left-3 opacity-[0.08] animate-float-fast">
          <svg className="w-16 h-16 text-amber-500 fill-current" viewBox="0 0 24 24">
            <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.9"/>
            <circle cx="9.5" cy="13" r="1" fill="#fff"/><circle cx="12" cy="13" r="1" fill="#fff"/>
            <circle cx="14.5" cy="13" r="1" fill="#fff"/><circle cx="9.5" cy="17" r="1" fill="#fff"/>
            <circle cx="12" cy="17" r="1" fill="#fff"/><circle cx="14.5" cy="17" r="1" fill="#fff"/>
          </svg>
        </div>
        <div className="absolute top-1/2 -right-1 opacity-[0.07] animate-float-slow -rotate-45">
          <svg className="w-10 h-20 text-secondary fill-none stroke-current" viewBox="0 0 12 32" strokeWidth="1.5">
            <path d="M6 2 C6 2 2 4 2 10 L2 28 Q6 32 10 28 L10 10 C10 4 6 2 6 2Z"/>
            <circle cx="6" cy="4" r="2" fill="currentColor" opacity="0.5"/>
            <line x1="4" y1="10" x2="8" y2="10"/>
          </svg>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-[0.06] animate-float-medium">
          <svg className="w-6 h-32 text-primary fill-current" viewBox="0 0 8 48">
            <path d="M3.5 0 C3 0 2 1 2 2 L2 42 L3.5 48 L5 42 L5 2 C5 1 4 0 3.5 0Z" opacity="0.9"/>
            <ellipse cx="3.5" cy="3.5" rx="2" ry="2" fill="#ffdbe8"/>
          </svg>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-on-surface mb-4">
          Notre Sélection Atelier
        </h2>
        <p className="text-on-surface-variant font-body-md max-w-2xl mx-auto">
          Des outils de qualité professionnelle pour donner vie à toutes vos créations textiles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((prod, index) => (
          <ProductCard
            key={index}
            id={prod.id}
            image={prod.image}
            title={prod.title}
            price={prod.price}
            description={prod.description}
            badge={prod.badge}
          />
        ))}
      </div>
    </section>
  );
}
