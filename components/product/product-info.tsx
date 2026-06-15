"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/shop-data";
import { useCart } from "@/lib/cart-context";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const { title, price, originalPrice, description, badge = "Nouveau" } = product;
  const rating = 4.8;
  const reviewCount = 128;
  const { addToCart } = useCart();

  const handleScrollToForm = () => {
    const el = document.getElementById("order-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Badge & Rating Row */}
      <div className="flex items-center gap-3 mb-3">
        {badge && (
          <span className="bg-surface-variant text-on-surface-variant font-label-sm px-2.5 py-1 rounded-DEFAULT text-xs font-bold uppercase tracking-wider">
            {badge}
          </span>
        )}
        <div className="flex text-amber-500 items-center">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            const isHalf = rating < starValue && rating >= starValue - 0.5;
            const isFull = rating >= starValue;
            
            return (
              <span
                key={i}
                className="material-symbols-outlined text-[18px] fill"
                style={{
                  fontVariationSettings: `"FILL" ${isFull ? 1 : isHalf ? 0.5 : 0}, "wght" 400`,
                  color: isFull || isHalf ? "#cba72f" : "#c8c6c6",
                }}
              >
                {isFull ? "star" : isHalf ? "star_half" : "star"}
              </span>
            );
          })}
        </div>
        <span className="font-label-sm text-secondary text-xs">
          ({reviewCount} avis)
        </span>
      </div>

      {/* Title */}
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3 leading-tight">
        {title}
      </h1>

      {/* Pricing */}
      <div className="flex items-end gap-3 mb-6">
        <span className="font-headline-lg text-[32px] md:text-[36px] font-black text-primary tracking-tight">
          {price}
        </span>
        {originalPrice && (
          <span className="font-body-md text-on-surface-variant/70 line-through mb-1.5 text-sm md:text-base">
            {originalPrice}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-body-lg text-body-lg text-on-surface-variant/90 mb-8 leading-relaxed">
        {description}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          onClick={handleScrollToForm}
          className="flex-grow flex-[2] bg-primary text-on-primary py-4 px-6 rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 duration-150 font-bold"
        >
          <ShoppingCart className="w-5 h-5" />
          Acheter Immédiatement
        </button>
        <button
          onClick={() => addToCart(product)}
          className="flex-grow flex-[1.5] bg-secondary-container text-on-secondary-container py-4 px-6 rounded-full font-label-md text-label-md hover:bg-outline-variant/30 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 duration-150 font-bold"
        >
          <ShoppingCart className="w-5 h-5" />
          Ajouter au panier
        </button>
      </div>
      <a
        href="https://wa.me/213550000000" // Mock WhatsApp link for Algeria
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-transparent text-primary border-2 border-primary py-3 px-6 rounded-full font-label-md text-label-md hover:bg-primary-fixed hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 duration-150 font-bold mb-8"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
        Commander via WhatsApp
      </a>
    </div>
  );
}
