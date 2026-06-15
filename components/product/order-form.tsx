"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { WilayaSelect } from "../ui/wilaya-select";
import { CommuneSelect } from "../ui/commune-select";
import OrderSummary from "./order-summary";
import algeriaData from "@/data/algeria.json";

// Validation Schema
const orderSchema = z.object({
  nom: z.string().min(2, "Le nom complet est obligatoire (min 2 caractères)"),
  telephone: z.string().min(10, "Le numéro de téléphone est obligatoire (min 10 chiffres)"),
  wilaya: z.string().min(1, "Le choix de la wilaya est obligatoire"),
  commune: z.string().min(1, "Le choix de la commune est obligatoire"),
  typeLivraison: z.enum(["bureau", "domicile"]),
  adresse: z.string().optional(),
  quantite: z.number().min(1, "La quantité minimale est de 1"),
  note: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  productTitle: string;
  productPriceDA: number;
  onSubmit: (data: OrderFormData) => void;
}

export default function OrderForm({
  productTitle,
  productPriceDA,
  onSubmit,
}: OrderFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      wilaya: "",
      commune: "",
      typeLivraison: "bureau",
      adresse: "",
      quantite: 1,
      note: "",
    },
  });

  // Watch fields for summary and visibility
  const quantity = watch("quantite") || 1;
  const selectedWilayaCode = watch("wilaya");
  const typeLivraison = watch("typeLivraison") || "bureau";
  const selectedWilayaName = React.useMemo(() => {
    if (!selectedWilayaCode) return undefined;
    return algeriaData.find((w) => w.code === selectedWilayaCode)?.name;
  }, [selectedWilayaCode]);

  // Handle quantity modification
  const incrementQuantity = () => {
    setValue("quantite", quantity + 1, { shouldValidate: true });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setValue("quantite", quantity - 1, { shouldValidate: true });
    }
  };

  // Reset commune when wilaya changes
  React.useEffect(() => {
    setValue("commune", "", { shouldValidate: false });
  }, [selectedWilayaCode, setValue]);

  return (
    <div
      id="order-form-section"
      className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-outline-variant/30 relative select-none scroll-mt-28"
    >
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2 font-bold text-primary">
        <span className="material-symbols-outlined text-primary">shopping_bag</span>
        Finaliser votre commande
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Nom Complet */}
        <div>
          <label className="block font-label-sm text-on-surface-variant mb-1 font-semibold text-xs" htmlFor="nom">
            Nom complet *
          </label>
          <input
            {...register("nom")}
            className={`w-full bg-surface-container-low border rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body-md py-3 px-4 transition-colors ${
              errors.nom ? "border-error focus:border-error focus:ring-error" : "border-outline-variant/50"
            }`}
            id="nom"
            placeholder="Ex: Fatima Zahra"
            type="text"
          />
          {errors.nom && <p className="text-error text-xs mt-1 font-semibold">{errors.nom.message}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block font-label-sm text-on-surface-variant mb-1 font-semibold text-xs" htmlFor="telephone">
            Téléphone *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant/70 font-body-md">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </span>
            <input
              {...register("telephone")}
              className={`w-full bg-surface-container-low border rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body-md py-3 pl-10 pr-4 transition-colors ${
                errors.telephone ? "border-error focus:border-error focus:ring-error" : "border-outline-variant/50"
              }`}
              id="telephone"
              placeholder="05XX XX XX XX"
              type="tel"
            />
          </div>
          {errors.telephone && (
            <p className="text-error text-xs mt-1 font-semibold">{errors.telephone.message}</p>
          )}
        </div>

        {/* Wilaya / Commune Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-label-sm text-on-surface-variant mb-1 font-semibold text-xs" htmlFor="wilaya">
              Wilaya *
            </label>
            <WilayaSelect
              {...register("wilaya")}
              error={errors.wilaya?.message}
              id="wilaya"
            />
          </div>

          <div>
            <label className="block font-label-sm text-on-surface-variant mb-1 font-semibold text-xs" htmlFor="commune">
              Commune *
            </label>
            <CommuneSelect
              {...register("commune")}
              wilayaCode={selectedWilayaCode}
              error={errors.commune?.message}
              id="commune"
            />
          </div>
        </div>

        {/* Hidden field for delivery type registration */}
        <input type="hidden" {...register("typeLivraison")} />

        {/* Mode de livraison */}
        <div>
          <label className="block font-label-sm text-on-surface-variant mb-2 font-semibold text-xs">
            Mode de livraison *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setValue("typeLivraison", "bureau", { shouldValidate: true });
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer ${
                typeLivraison === "bureau"
                  ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                  : "border-outline-variant/50 hover:bg-surface-container-low text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined mb-1">domain</span>
              <span className="font-semibold text-sm">Au bureau (Stop Desk)</span>
              <span className="text-[10px] opacity-80 mt-0.5">Yalidine / Bureau d&apos;agence</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("typeLivraison", "domicile", { shouldValidate: true });
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer ${
                typeLivraison === "domicile"
                  ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                  : "border-outline-variant/50 hover:bg-surface-container-low text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined mb-1">home</span>
              <span className="font-semibold text-sm">À domicile</span>
              <span className="text-[10px] opacity-80 mt-0.5">Livraison à votre adresse</span>
            </button>
          </div>
        </div>

        {/* Adresse */}
        {typeLivraison === "domicile" && (
          <div className="animate-in fade-in slide-in-from-top duration-200">
            <label className="block font-label-sm text-on-surface-variant mb-1 font-semibold text-xs" htmlFor="adresse">
              Adresse complète du domicile (facultative)
            </label>
            <textarea
              {...register("adresse")}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body-md py-3 px-4 transition-colors resize-none"
              id="adresse"
              placeholder="Ex: Quartier 5 Juillet, Rue Didouche Mourad, Bâtiment C N°12"
              rows={2}
            />
          </div>
        )}

        {/* Note (optional) */}
        <div>
          <label className="block font-label-sm text-on-surface-variant mb-1 font-semibold text-xs" htmlFor="note">
            Note facultative (instructions de livraison...)
          </label>
          <textarea
            {...register("note")}
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-DEFAULT focus:border-primary focus:ring-1 focus:ring-primary text-on-surface font-body-md py-3 px-4 transition-colors resize-none"
            id="note"
            placeholder="Ex: Appelez avant d'arriver..."
            rows={1}
          />
        </div>

        {/* Quantité Selector */}
        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4 mt-2">
          <label className="block font-label-sm text-on-surface-variant font-semibold text-xs" htmlFor="quantite">
            Quantité
          </label>
          <div className="flex items-center border border-outline-variant/50 rounded-DEFAULT bg-surface-container-low">
            <button
              className="px-4 py-2 text-primary hover:bg-surface-variant transition-colors font-bold text-lg select-none cursor-pointer"
              onClick={decrementQuantity}
              type="button"
            >
              -
            </button>
            <span className="w-12 text-center font-bold text-on-surface">
              {quantity}
            </span>
            <button
              className="px-4 py-2 text-primary hover:bg-surface-variant transition-colors font-bold text-lg select-none cursor-pointer"
              onClick={incrementQuantity}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        {/* Live Order Summary */}
        <OrderSummary
          productName={productTitle}
          unitPriceDA={productPriceDA}
          quantity={quantity}
          wilayaCode={selectedWilayaCode}
          wilayaName={selectedWilayaName}
          typeLivraison={typeLivraison}
        />

        {/* Submit button */}
        <button
          className={`w-full bg-primary text-on-primary font-label-md py-4 rounded-full shadow-md hover:bg-primary-container hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 mt-4 flex justify-center items-center gap-2 group cursor-pointer active:scale-95 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Confirmer ma commande"}
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <p className="text-center font-label-sm text-on-surface-variant/70 mt-2 flex items-center justify-center gap-1 text-xs">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          Paiement sécurisé à la livraison
        </p>
      </form>
    </div>
  );
}
