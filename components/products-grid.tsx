"use client";

import { Product } from "@/lib/shop-data";
import ShopProductCard from "./shop-product-card";
import { PackageSearch } from "lucide-react";

interface ProductsGridProps {
  products: Product[];
  activeCategory: string | null;
  searchQuery: string;
}

export default function ProductsGrid({ products, activeCategory, searchQuery }: ProductsGridProps) {
  const isEmpty = products.length === 0;

  const heading = activeCategory
    ? `Résultats${searchQuery ? ` pour "${searchQuery}"` : ""}`
    : searchQuery
    ? `Recherche : "${searchQuery}"`
    : "Tous les produits";

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-on-surface font-bold">
          {heading}
        </h2>
        <span className="text-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
          {products.length} produit{products.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center">
            <PackageSearch className="w-9 h-9 text-on-surface-variant" />
          </div>
          <h3 className="font-headline-md text-on-surface">Aucun produit trouvé</h3>
          <p className="text-on-surface-variant max-w-sm">
            Essayez d'autres mots-clés ou explorez une catégorie différente.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
