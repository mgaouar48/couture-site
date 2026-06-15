"use client";

export interface SpecificationItem {
  label: string;
  value: string;
}

interface ProductSpecificationsProps {
  specifications?: SpecificationItem[];
}

const DEFAULT_SPECS: SpecificationItem[] = [
  { label: "Caractéristiques", value: "32 points de couture intégrés" },
  { label: "Enfilage", value: "Automatique de l'aiguille" },
  { label: "Châssis", value: "Châssis métallique robuste" },
  { label: "Boutonnière", value: "En 1 seule étape" },
  { label: "Garantie", value: "24 mois" },
];

export default function ProductSpecifications({
  specifications = DEFAULT_SPECS,
}: ProductSpecificationsProps) {
  return (
    <div className="mb-8 border border-outline-variant/50 rounded-lg bg-surface-container-lowest overflow-hidden shadow-sm">
      <details className="group" open>
        <summary className="flex justify-between items-center font-label-md p-4 cursor-pointer bg-surface-container-low/50 hover:bg-surface-container-low transition-colors select-none font-semibold text-primary">
          Caractéristiques Principales
          <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-primary">
            expand_more
          </span>
        </summary>
        <div className="p-4 font-body-md text-on-surface-variant border-t border-outline-variant/30 bg-surface-container-lowest">
          <ul className="space-y-3">
            {specifications.map((spec, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 pb-1 ${
                  index !== specifications.length - 1
                    ? "border-b border-dashed border-outline-variant/30 pb-2"
                    : ""
                }`}
              >
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                <span className="font-semibold text-on-surface text-sm">{spec.label} :</span>
                <span className="text-on-surface-variant text-sm">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
