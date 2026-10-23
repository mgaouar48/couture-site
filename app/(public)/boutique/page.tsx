"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ShoppingCart, User, Menu, X, Scissors, Ruler } from "lucide-react";
import ShopHero from "@/components/shop-hero";
import SearchBar from "@/components/search-bar";
import CategoriesGrid from "@/components/categories-grid";
import ProductsGrid from "@/components/products-grid";
import TrustBanner from "@/components/trust-banner";
import WhatsAppButton from "@/components/whatsapp-button";
import { ALL_PRODUCTS, Product } from "@/lib/shop-data";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function BoutiquePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse admin_products from localStorage", e);
        setProducts(ALL_PRODUCTS);
      }
    } else {
      setProducts(ALL_PRODUCTS);
      localStorage.setItem("admin_products", JSON.stringify(ALL_PRODUCTS));
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, search, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md antialiased texture-linen select-none">

      {/* ── Navigation — même design que la landing page ── */}
      <nav className="bg-surface sticky top-0 z-50 w-full border-b border-secondary/20 overflow-hidden">
        {/* Floating Decorative Tools on the bar */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {/* Scissors near center-left */}
          <div className="absolute left-[38%] top-1/2 -translate-y-1/2 animate-float-slow opacity-20">
            <Scissors className="w-6 h-6 text-primary stroke-[1.5] -rotate-12" />
          </div>
          {/* Ruler near center */}
          <div className="absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 animate-float-medium opacity-15">
            <Ruler className="w-7 h-7 text-tertiary stroke-[1.5] rotate-6" />
          </div>
          {/* Thimble SVG near right center */}
          <div className="absolute left-[62%] top-1/2 -translate-y-1/2 animate-float-fast opacity-20">
            <svg className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 24 24">
              <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.9"/>
              <circle cx="10" cy="13" r="0.8" fill="#fff"/>
              <circle cx="12" cy="13" r="0.8" fill="#fff"/>
              <circle cx="14" cy="13" r="0.8" fill="#fff"/>
            </svg>
          </div>
          {/* Thread spool far right */}
          <div className="absolute right-[28%] top-1/2 -translate-y-1/2 animate-float-slow opacity-20">
            <svg className="w-5 h-7 text-[#bd1e7c] fill-current" viewBox="0 0 24 24">
              <rect x="6" y="4" width="12" height="16" rx="1" fill="currentColor" opacity="0.9"/>
              <ellipse cx="12" cy="3" rx="8" ry="2" fill="#ffdbe8"/>
              <ellipse cx="12" cy="21" rx="8" ry="2" fill="#ffdbe8"/>
              <path d="M6 8h12M6 12h12M6 16h12" stroke="#fff" strokeWidth="1"/>
            </svg>
          </div>
          {/* Small needle left side */}
          <div className="absolute left-[30%] top-1/2 -translate-y-1/2 animate-float-medium opacity-20">
            <svg className="w-3 h-8 text-primary fill-current" viewBox="0 0 8 32">
              <path d="M3.5 0 C3.5 0 2 1 2 2 L2 28 L3.5 32 L5 28 L5 2 C5 1 4.5 0 3.5 0Z" fill="currentColor" opacity="0.8"/>
              <ellipse cx="3.5" cy="3" rx="1.5" ry="1.5" fill="#ffdbe8"/>
            </svg>
          </div>
        </div>

        <div className="relative flex justify-between items-center px-margin-mobile md:px-margin-desktop h-24 w-full max-w-container-max mx-auto">

          {/* Logo */}
          <a className="flex items-center flex-shrink-0" href="/" aria-label="Boutique Farah – Accueil">
            <div className="relative w-56 h-20 select-none drop-shadow-sm">
              <Image
                src="/images/logo_clean.png"
                alt="Boutique Farah Logo"
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-gutter">
            <a className="text-secondary hover:text-primary font-label-md text-label-md transition-colors scale-95 active:scale-90 duration-150" href="/">
              Accueil
            </a>
            <a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md transition-colors scale-95 active:scale-90 duration-150" href="/boutique">
              Boutique
            </a>
            <a className="text-secondary hover:text-primary font-label-md text-label-md transition-colors scale-95 active:scale-90 duration-150" href="/#contact">
              Contact
            </a>
          </div>

          {/* Right navbar elements */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-secondary hover:text-primary transition-colors cursor-pointer relative"
              aria-label="Panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[9px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1 border border-surface shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden md:inline-flex bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer"
            >
              Mon Panier
            </button>
            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-secondary hover:text-primary p-1 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="fixed top-[96px] right-0 left-0 bg-surface border-b border-outline-variant/30 p-6 flex flex-col gap-4 shadow-xl z-50 animate-in slide-in-from-top duration-200">
            <a onClick={() => setMobileMenuOpen(false)} className="text-secondary font-label-md text-label-md border-b border-outline-variant/20 pb-2 hover:text-primary transition-colors" href="/">
              Accueil
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="text-primary font-bold font-label-md text-label-md border-b border-outline-variant/20 pb-2" href="/boutique">
              Boutique
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="text-secondary font-label-md text-label-md border-b border-outline-variant/20 pb-2 hover:text-primary transition-colors" href="/#contact">
              Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-full text-center transition-all duration-200 mt-2 cursor-pointer hover:bg-primary-container hover:text-on-primary-container"
            >
              Mon Panier
            </button>
          </div>
        </div>
      )}


      {/* ── Main ── */}
      <main className="flex-grow">

        {/* Hero */}
        <ShopHero />

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-14 space-y-10">

          {/* Trust banner */}
          <TrustBanner />

          {/* Search */}
          <section aria-label="Recherche produits">
            <SearchBar value={search} onChange={setSearch} />
          </section>

          {/* Categories */}
          <section aria-label="Catégories de produits">
            <CategoriesGrid activeCategory={activeCategory} onSelect={setActiveCategory} />
          </section>

          {/* Divider */}
          <div className="w-full stitching-divider opacity-40" />

          {/* Products */}
          <section aria-label="Liste des produits">
            <ProductsGrid
              products={filteredProducts}
              activeCategory={activeCategory}
              searchQuery={search}
            />
          </section>

          {/* Bottom padding spacer for floating button */}
          <div className="h-16" />
        </div>
      </main>

      {/* Footer strip */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-6 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-primary" />
            <span>© 2024 Boutique Farah. L&apos;excellence artisanale à chaque point.</span>
          </div>
          <div className="flex gap-5">
            <a href="/#contact" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Livraison</a>
            <a href="#" className="hover:text-primary transition-colors">Politique</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </div>
  );
}
