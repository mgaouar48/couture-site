"use client";

import { Category } from "@/lib/shop-data";
import { Scissors, Ruler, Package, Sparkles, Zap, Wind } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "sewing-machine": (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current" strokeWidth="1.6">
      <rect x="3" y="11" width="14" height="9" rx="1.5"/>
      <path d="M17 14h2a2 2 0 0 1 2 2v2h-4"/>
      <circle cx="7" cy="20" r="1.5"/><circle cx="13" cy="20" r="1.5"/>
      <path d="M3 11V8a6 6 0 0 1 6-6h2l3 3v6"/>
      <circle cx="11" cy="7" r="1.5"/>
    </svg>
  ),
  scissors: <Scissors className="w-7 h-7 stroke-[1.6]" />,
  ruler: <Ruler className="w-7 h-7 stroke-[1.6]" />,
  sparkles: <Sparkles className="w-7 h-7 stroke-[1.6]" />,
  package: <Package className="w-7 h-7 stroke-[1.6]" />,
  cut: (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-current" strokeWidth="1.6">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
};

const BG_MAP: Record<string, string> = {
  machines: "from-rose-50 to-pink-100 border-rose-200 hover:from-rose-100 hover:to-pink-200",
  ciseaux: "from-amber-50 to-yellow-100 border-amber-200 hover:from-amber-100 hover:to-yellow-200",
  regles: "from-sky-50 to-blue-100 border-sky-200 hover:from-sky-100 hover:to-blue-200",
  accessoires: "from-violet-50 to-purple-100 border-violet-200 hover:from-violet-100 hover:to-purple-200",
  kits: "from-emerald-50 to-green-100 border-emerald-200 hover:from-emerald-100 hover:to-green-200",
  coupe: "from-orange-50 to-red-100 border-orange-200 hover:from-orange-100 hover:to-red-200",
};

const ICON_COLOR_MAP: Record<string, string> = {
  machines: "text-rose-600",
  ciseaux: "text-amber-600",
  regles: "text-sky-600",
  accessoires: "text-violet-600",
  kits: "text-emerald-600",
  coupe: "text-orange-600",
};

const ACTIVE_MAP: Record<string, string> = {
  machines: "ring-2 ring-rose-400 from-rose-100 to-pink-200",
  ciseaux: "ring-2 ring-amber-400 from-amber-100 to-yellow-200",
  regles: "ring-2 ring-sky-400 from-sky-100 to-blue-200",
  accessoires: "ring-2 ring-violet-400 from-violet-100 to-purple-200",
  kits: "ring-2 ring-emerald-400 from-emerald-100 to-green-200",
  coupe: "ring-2 ring-orange-400 from-orange-100 to-red-200",
};

export default function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const icon = ICON_MAP[category.icon];
  const bg = BG_MAP[category.id] ?? "from-gray-50 to-gray-100 border-gray-200";
  const iconColor = ICON_COLOR_MAP[category.id] ?? "text-primary";
  const activeRing = ACTIVE_MAP[category.id] ?? "ring-2 ring-primary";

  return (
    <button
      onClick={onClick}
      id={`category-${category.id}`}
      aria-pressed={isActive}
      className={`
        group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border
        bg-gradient-to-br transition-all duration-300 cursor-pointer text-center w-full
        shadow-sm hover:shadow-md active:scale-95
        ${bg}
        ${isActive ? activeRing : ""}
      `}
    >
      {/* Active dot indicator */}
      {isActive && (
        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
      )}

      {/* Icon container */}
      <div className={`
        flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm
        group-hover:scale-110 transition-transform duration-300 ${iconColor}
      `}>
        {icon}
      </div>

      {/* Label */}
      <span className="font-label-md font-semibold text-on-surface text-sm leading-tight">
        {category.name}
      </span>

      {/* Count badge */}
      <span className="text-xs text-on-surface-variant opacity-80">
        {category.count} produits
      </span>
    </button>
  );
}
