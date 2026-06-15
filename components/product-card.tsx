"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge, Product } from "@/lib/shop-data";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  badge?: Badge;
}

export default function ProductCard({
  id,
  image,
  title,
  price,
  description,
  badge = null,
}: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <Link
      href={`/product/${id}`}
      className="group bg-surface-container-low rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30 flex flex-col relative cursor-pointer"
    >
      {badge && (
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full font-label-sm z-10 shadow-sm ${
            badge === "NOUVEAU"
              ? "bg-tertiary text-on-tertiary"
              : badge === "POPULAIRE"
              ? "bg-tertiary-container text-on-tertiary-container"
              : "bg-red-600 text-white font-bold"
          }`}
        >
          {badge}
        </div>
      )}

      {/* Product Image Container with Herringbone pattern */}
      <div className="aspect-square bg-white relative p-6 texture-herringbone flex items-center justify-center select-none">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-body-lg font-semibold text-on-surface mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl md:text-3xl font-black text-primary tracking-tight">
            {price}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({
                id,
                image,
                title,
                price,
                description,
                badge,
                category: "",
              });
            }}
            className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer active:scale-90"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
