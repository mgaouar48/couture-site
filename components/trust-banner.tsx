"use client";

import { Truck, CreditCard, MessageSquare, ShieldCheck } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: CreditCard,
    label: "Paiement à la livraison",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: Truck,
    label: "Livraison rapide",
    color: "text-sky-600",
    bg: "bg-sky-50 border-sky-200",
  },
  {
    icon: ShieldCheck,
    label: "Produits de qualité",
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-200",
  },
  {
    icon: MessageSquare,
    label: "Assistance WhatsApp",
    color: "text-primary",
    bg: "bg-primary-fixed/40 border-outline-variant",
  },
];

export default function TrustBanner() {
  return (
    <div className="relative bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-surface-container-lowest rounded-2xl border border-outline-variant/50 overflow-hidden shadow-sm">
      {/* Dashed stitching inner border */}
      <div className="absolute inset-2 rounded-xl border border-dashed border-outline-variant/40 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-outline-variant/30">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 px-4 py-5 text-center sm:text-left"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${item.bg}`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="font-semibold text-on-surface text-xs sm:text-sm leading-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
