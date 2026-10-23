"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Star, ShoppingCart } from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/lib/shop-data";
import { useCart } from "@/lib/cart-context";
import ProductGallery from "@/components/product/product-gallery";
import ProductInfo from "@/components/product/product-info";
import TrustBadges from "@/components/product/trust-badges";
import ProductSpecifications from "@/components/product/product-specifications";
import OrderForm, { OrderFormData } from "@/components/product/order-form";
import ShopProductCard from "@/components/shop-product-card";
import { notFound } from "next/navigation";
import algeriaData from "@/data/algeria.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { setIsCartOpen, cartCount } = useCart();

  const [product, setProduct] = useState<Product | undefined>(() => {
    return ALL_PRODUCTS.find((p) => p.id === productId);
  });
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(() => {
    return ALL_PRODUCTS.filter((p) => p.id !== productId).slice(0, 4);
  });

  useEffect(() => {
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      try {
        const localProducts: Product[] = JSON.parse(stored);
        const found = localProducts.find((p) => p.id === productId);
        if (found) {
          setProduct(found);
        }
        setRelatedProducts(localProducts.filter((p) => p.id !== productId).slice(0, 4));
      } catch (e) {
        console.error("Failed to parse admin_products from localStorage", e);
      }
    }
  }, [productId]);

  // Order success state
  const [orderSuccess, setOrderSuccess] = useState<OrderFormData | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface texture-linen">
        <div className="text-center bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-md">
          <h1 className="text-2xl font-black text-primary mb-4">Produit non trouvé</h1>
          <p className="text-on-surface-variant mb-6">Le produit recherché n&apos;existe pas ou a été retiré.</p>
          <Link href="/" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold inline-block hover:bg-primary-container transition-colors shadow-sm">
            Retourner à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  // Parse price string to number for calculations
  const unitPriceDA = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 0;

  const handleOrderSubmit = (data: OrderFormData) => {
    // Save order details to localStorage admin_orders
    const codeNum = parseInt(data.wilaya, 10);
    let baseRate = 700;
    if ([16, 25, 31].includes(codeNum)) {
      baseRate = 400;
    } else if (codeNum >= 49) {
      baseRate = 900;
    }
    const shippingCost = data.typeLivraison === "domicile" ? baseRate + 250 : baseRate;
    const totalPrice = unitPriceDA * data.quantite + shippingCost;

    const wilayaObj = algeriaData.find((w) => w.code === data.wilaya);
    const wilayaString = wilayaObj ? `${wilayaObj.code} - ${wilayaObj.name}` : data.wilaya;

    // Date formatting (DD/MM/YYYY HH:MM)
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const newOrder = {
      id: `CMD-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      nom: data.nom,
      telephone: data.telephone,
      wilaya: wilayaString,
      commune: data.commune,
      typeLivraison: data.typeLivraison,
      adresse: data.adresse || "",
      productTitle: product.title,
      quantite: data.quantite,
      totalPrice: totalPrice,
      date: dateStr,
      status: "pending",
      note: data.note || "",
    };

    try {
      const stored = localStorage.getItem("admin_orders");
      const currentOrders = stored ? JSON.parse(stored) : [];
      const updatedOrders = [newOrder, ...currentOrders];
      localStorage.setItem("admin_orders", JSON.stringify(updatedOrders));
    } catch (e) {
      console.error("Failed to save order to localStorage:", e);
    }

    console.log("Order submitted and saved:", newOrder);
    setOrderSuccess(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md antialiased texture-linen relative overflow-x-hidden">
      
      {/* Styles for decorative floating elements */}
      <style jsx global>{`
        .floating-tool {
          position: absolute;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
          color: #980061; /* primary color */
        }
        @media (max-width: 768px) {
          .floating-tool {
            opacity: 0.01;
          }
        }
      `}</style>

      {/* Background Decorative Tools */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <span className="material-symbols-outlined floating-tool text-[120px] top-40 -left-10 rotate-45">content_cut</span>
        <span className="material-symbols-outlined floating-tool text-[80px] top-1/3 right-10 -rotate-12">straighten</span>
        <span className="material-symbols-outlined floating-tool text-[100px] bottom-1/4 -left-5 rotate-12">local_laundry_service</span>
      </div>

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 shadow-sm flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Retour à l'accueil" className="text-primary hover:opacity-80 transition-all flex items-center justify-center p-1.5 rounded-full hover:bg-surface-container-low">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link className="font-display-lg text-lg md:text-xl font-black text-primary tracking-tight" href="/">
            Boutique Farah
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-primary hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-container-low cursor-pointer relative"
            aria-label="Panier"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[9px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1 border border-surface shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
          <Link href="https://wa.me/213550000000" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-container-low" aria-label="Chat support">
            <MessageSquare className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-grow pt-24 pb-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Product Imagery */}
        <section aria-label="Présentation du produit" className="w-full lg:w-1/2 flex flex-col gap-4">
          <ProductGallery
            mainImage={product.image}
            title={product.title}
            badge={product.badge ? product.badge : "En Stock"}
          />
          <TrustBadges />
        </section>

        {/* Right Column: Details & Order Form */}
        <section aria-label="Détails et commande" className="w-full lg:w-1/2 flex flex-col gap-6 mt-4 lg:mt-0">
          
          {/* Title, price, desc */}
          <ProductInfo
            product={product}
          />

          {/* Specifications Accordion */}
          <ProductSpecifications />

          {/* Stitched Separator */}
          <div className="w-full stitching-divider opacity-40 my-4" />

          {/* Order Form */}
          <OrderForm
            productTitle={product.title}
            productPriceDA={unitPriceDA}
            onSubmit={handleOrderSubmit}
          />
        </section>
      </main>

      {/* Related Products Grid */}
      <section aria-label="Produits complémentaires" className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 border-t border-dashed border-outline-variant/40 w-full z-10 relative">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-8 text-center font-bold">
          Complétez votre atelier
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((prod) => (
            <ShopProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-dashed border-outline-variant bg-surface-container-lowest/80 relative z-10">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display-lg text-base font-black text-primary">Boutique Farah</div>
          <div className="flex gap-6 text-sm text-secondary font-medium">
            <Link className="hover:text-primary transition-colors" href="#">Confidentialité</Link>
            <Link className="hover:text-primary transition-colors" href="#">Conditions</Link>
            <Link className="hover:text-primary transition-colors" href="#">Livraison</Link>
            <Link className="hover:text-primary transition-colors" href="#">Contact</Link>
          </div>
          <div className="text-secondary text-xs">
            © 2026 Boutique Farah. L&apos;excellence artisanale à chaque point.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant/30 px-margin-mobile py-3 flex items-center justify-between gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] select-none">
        <div>
          <span className="text-[10px] text-on-surface-variant block uppercase font-bold tracking-wider">Total</span>
          <span className="text-lg font-black text-primary">{product.price}</span>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById("order-form-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-primary text-on-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-primary-container transition-colors cursor-pointer active:scale-95 shadow-sm"
        >
          Acheter maintenant
        </button>
      </div>

      {/* Order Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-margin-mobile animate-in fade-in duration-300">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 md:p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in scale-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-primary mb-2">
              Félicitations, {orderSuccess.nom} !
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base mb-6 leading-relaxed">
              Votre commande pour <strong>{product.title} (x{orderSuccess.quantite})</strong> a été enregistrée avec succès. 
              Notre équipe vous contactera sous peu au <strong>{orderSuccess.telephone}</strong> pour confirmer la livraison.
            </p>
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={() => setOrderSuccess(null)}
                className="w-full bg-primary text-on-primary py-3 rounded-full font-bold hover:bg-primary-container transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                Fermer
              </button>
              <Link
                href="/"
                className="w-full bg-surface-container-low text-primary py-3 rounded-full font-bold hover:bg-surface-container-high transition-all text-center block text-sm"
              >
                Retourner à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
