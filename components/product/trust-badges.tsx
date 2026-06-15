import React from "react";

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {/* Badge 1 */}
      <div className="flex flex-col items-center text-center p-3 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 select-none">
        <span
          className="material-symbols-outlined text-primary mb-1 text-[28px]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
        >
          payments
        </span>
        <span className="font-label-sm text-on-surface-variant text-[11px] md:text-xs leading-tight font-medium mt-1">
          Paiement à la livraison
        </span>
      </div>

      {/* Badge 2 */}
      <div className="flex flex-col items-center text-center p-3 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 select-none">
        <span
          className="material-symbols-outlined text-primary mb-1 text-[28px]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
        >
          local_shipping
        </span>
        <span className="font-label-sm text-on-surface-variant text-[11px] md:text-xs leading-tight font-medium mt-1">
          Livraison 58 Wilayas
        </span>
      </div>

      {/* Badge 3 */}
      <div className="flex flex-col items-center text-center p-3 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 select-none">
        <span
          className="material-symbols-outlined text-primary mb-1 text-[28px]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
        >
          workspace_premium
        </span>
        <span className="font-label-sm text-on-surface-variant text-[11px] md:text-xs leading-tight font-medium mt-1">
          Qualité Premium
        </span>
      </div>
    </div>
  );
}
