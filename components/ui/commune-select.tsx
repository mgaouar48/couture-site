import React from "react";
import algeriaData from "@/data/algeria.json";

export interface CommuneSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  wilayaCode?: string;
  error?: string;
}

export const CommuneSelect = React.forwardRef<HTMLSelectElement, CommuneSelectProps>(
  ({ wilayaCode, error, className = "", ...props }, ref) => {
    // Get communes for the selected wilaya code
    const communes = React.useMemo(() => {
      if (!wilayaCode) return [];
      const found = algeriaData.find((w) => w.code === wilayaCode);
      return found ? found.communes : [];
    }, [wilayaCode]);

    return (
      <div className="w-full">
        <select
          ref={ref}
          disabled={!wilayaCode}
          className={`w-full bg-surface-container-low border border-outline-variant/50 rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body-md py-3 px-4 transition-colors ${className} ${
            !wilayaCode ? "opacity-50 cursor-not-allowed" : ""
          } ${error ? "border-error focus:border-error focus:ring-error" : ""}`}
          {...props}
        >
          <option value="">
            {!wilayaCode ? "Sélectionnez d'abord une wilaya" : "Sélectionnez votre commune"}
          </option>
          {communes.map((commune) => (
            <option key={commune} value={commune}>
              {commune}
            </option>
          ))}
        </select>
        {error && <p className="text-error text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

CommuneSelect.displayName = "CommuneSelect";
