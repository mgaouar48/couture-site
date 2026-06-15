"use client";

import { CATEGORIES } from "@/lib/shop-data";
import CategoryCard from "./category-card";

interface CategoriesGridProps {
  activeCategory: string | null;
  onSelect: (id: string | null) => void;
}

export default function CategoriesGrid({ activeCategory, onSelect }: CategoriesGridProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-on-surface font-bold">
          Catégories
        </h2>
        {activeCategory && (
          <button
            onClick={() => onSelect(null)}
            className="text-sm text-primary hover:underline cursor-pointer font-medium transition-opacity hover:opacity-80"
          >
            Tout voir
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isActive={activeCategory === cat.id}
            onClick={() => onSelect(activeCategory === cat.id ? null : cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
