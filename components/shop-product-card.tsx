"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/shop-data";
import { useCart } from "@/lib/cart-context";

const BADGE_STYLES: Record<string, string> = {
  NOUVEAU: "bg-tertiary text-on-tertiary",
  POPULAIRE: "bg-primary text-on-primary",
  PROMO: "bg-error text-on-error",
};

interface ShopProductCardProps {
  product: Product;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  const { addToCart } = useCart();
  return (
    <Link
      href={`/product/${product.id}`}
      id={`product-${product.id}`}
      className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-outline-variant/40 hover:border-primary/30 flex flex-col relative cursor-pointer"
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold z-10 shadow-md ${BADGE_STYLES[product.badge]}`}
        >
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square bg-white overflow-hidden texture-herringbone flex items-center justify-center p-6 select-none">
        {/* Subtle pink tint overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        </div>

        {/* Quick "voir" overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full font-semibold text-sm shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            Voir le produit
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-on-surface text-sm md:text-base mb-1 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
          {product.title}
        </h3>
        <p className="text-on-surface-variant text-xs md:text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Price + CTA row */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-xl md:text-2xl font-black text-primary tracking-tight">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="block text-xs text-on-surface-variant line-through mt-0.5">
                {product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-1.5 bg-primary text-on-primary px-3 py-2 rounded-xl text-xs font-bold hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap flex-shrink-0 animate-pulse-once"
            aria-label={`Ajouter au panier ${product.title}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Ajouter
          </button>
        </div>
      </div>
    </Link>
  );
}
