"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Glow ring */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-container to-tertiary rounded-2xl opacity-30 blur-sm pointer-events-none" />

      <div className="relative flex items-center bg-surface-container-lowest border-2 border-outline-variant focus-within:border-primary rounded-2xl shadow-md transition-all duration-300 overflow-hidden">
        {/* Search icon */}
        <div className="flex items-center justify-center pl-5 pr-3 text-primary">
          <Search className="w-5 h-5 flex-shrink-0" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher un produit..."
          className="flex-1 bg-transparent py-4 pr-4 text-on-surface placeholder:text-on-surface-variant/60 text-base outline-none font-body-md"
          id="shop-search"
          aria-label="Rechercher un produit"
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange("")}
            className="flex items-center justify-center mr-3 w-7 h-7 rounded-full bg-surface-container text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200 cursor-pointer flex-shrink-0"
            aria-label="Effacer la recherche"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search button */}
        <button
          className="m-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 text-sm"
          aria-label="Lancer la recherche"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}
