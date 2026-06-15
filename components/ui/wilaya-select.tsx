import React from "react";
import algeriaData from "@/data/algeria.json";

export interface WilayaSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const WilayaSelect = React.forwardRef<HTMLSelectElement, WilayaSelectProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={`w-full bg-surface-container-low border border-outline-variant/50 rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body-md py-3 px-4 transition-colors ${className} ${
            error ? "border-error focus:border-error focus:ring-error" : ""
          }`}
          {...props}
        >
          <option value="">Sélectionnez votre wilaya</option>
          {algeriaData.map((w) => (
            <option key={w.code} value={w.code}>
              {w.code} - {w.name}
            </option>
          ))}
        </select>
        {error && <p className="text-error text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

WilayaSelect.displayName = "WilayaSelect";
