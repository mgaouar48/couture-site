
"use client";

import React, { useState, useMemo } from "react";
import { useCart, CartItem } from "@/lib/cart-context";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  ArrowRight,
  Lock,
  ArrowLeft,
  FileText
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WilayaSelect } from "./ui/wilaya-select";
import { CommuneSelect } from "./ui/commune-select";
import algeriaData from "@/data/algeria.json";

// Checkout Validation Schema
const checkoutSchema = z.object({
  nom: z.string().min(2, "Le nom complet est obligatoire (min 2 caractères)"),
  telephone: z.string().min(10, "Le numéro de téléphone est obligatoire (min 10 chiffres)"),
  wilaya: z.string().min(1, "Le choix de la wilaya est obligatoire"),
  commune: z.string().min(1, "Le choix de la commune est obligatoire"),
  typeLivraison: z.enum(["bureau", "domicile"]),
  adresse: z.string().optional(),
  note: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    clearCart
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [lastOrderDetails, setLastOrderDetails] = useState<CheckoutFormData | null>(null);
  const [lastShippingCost, setLastShippingCost] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nom: "",
      telephone: "",
      wilaya: "",
      commune: "",
      typeLivraison: "bureau",
      adresse: "",
      note: "",
    },
  });

  const selectedWilayaCode = watch("wilaya");
  const typeLivraison = watch("typeLivraison") || "bureau";

  const selectedWilayaName = useMemo(() => {
    if (!selectedWilayaCode) return undefined;
    return algeriaData.find((w) => w.code === selectedWilayaCode)?.name;
  }, [selectedWilayaCode]);

  // Dynamic shipping cost calculation
  const shippingCost = useMemo(() => {
    if (!selectedWilayaCode) return 0;
    const codeNum = parseInt(selectedWilayaCode, 10);
    let baseRate = 700;
    if ([16, 25, 31].includes(codeNum)) {
      baseRate = 400; // Alger, Constantine, Oran
    } else if (codeNum >= 49) {
      baseRate = 900; // Southern Wilayas
    }
    return typeLivraison === "domicile" ? baseRate + 250 : baseRate;
  }, [selectedWilayaCode, typeLivraison]);

  // Grand total
  const grandTotal = cartTotal + shippingCost;

  // Reset commune when wilaya changes
  React.useEffect(() => {
    setValue("commune", "", { shouldValidate: false });
  }, [selectedWilayaCode, setValue]);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = (data: CheckoutFormData) => {
    // Compile items for admin order log
    const itemsList = cart.map(item => ({
      productId: item.product.id,
      productTitle: item.product.title,
      quantite: item.quantity,
      price: item.product.price,
      image: item.product.image
    }));

    // Formulate a clean aggregate title for legacy dashboard compatibility
    let aggregateTitle = "";
    if (cart.length === 1) {
      aggregateTitle = `${cart[0].product.title} (x${cart[0].quantity})`;
    } else {
      aggregateTitle = `${cart[0].product.title} (+ ${cartCount - cart[0].quantity} articles)`;
    }

    const wilayaObj = algeriaData.find((w) => w.code === data.wilaya);
    const wilayaString = wilayaObj ? `${wilayaObj.code} - ${wilayaObj.name}` : data.wilaya;

    // Date formatting (DD/MM/YYYY HH:MM)
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const orderId = `CMD-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      nom: data.nom,
      telephone: data.telephone,
      wilaya: wilayaString,
      commune: data.commune,
      typeLivraison: data.typeLivraison,
      adresse: data.adresse || "",
      productTitle: aggregateTitle,
      quantite: cartCount,
      totalPrice: grandTotal,
      date: dateStr,
      status: "pending",
      note: data.note || "",
      items: itemsList // Detailed item array for updated dashboard
    };

    try {
      const stored = localStorage.getItem("admin_orders");
      const currentOrders = stored ? JSON.parse(stored) : [];
      localStorage.setItem("admin_orders", JSON.stringify([newOrder, ...currentOrders]));

      setCreatedOrderId(orderId);
      setLastOrderDetails(data);
      setLastShippingCost(shippingCost);
      setStep("success");
      clearCart();
      reset();
    } catch (e) {
      console.error("Failed to save order to localStorage:", e);
    }
  };

  const formatPrice = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DA";
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none font-sans">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative w-full sm:max-w-md bg-surface-container-lowest border-l border-outline-variant/30 shadow-2xl h-full flex flex-col z-10 transition-transform duration-300 overflow-hidden text-on-surface">

        {/* Drawer Header */}
        <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            {step === "checkout" ? (
              <button
                onClick={() => setStep("cart")}
                className="p-1 rounded-full hover:bg-surface-container-high transition-colors"
                aria-label="Retour au panier"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
            ) : (
              <ShoppingBag className="w-5 h-5 text-primary" />
            )}
            <h2 className="font-bold text-lg text-primary">
              {step === "cart" && `Votre Panier (${cartCount})`}
              {step === "checkout" && "Informations de livraison"}
              {step === "success" && "Commande Réussie !"}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              if (step === "success") setStep("cart");
            }}
            className="p-1.5 rounded-full hover:bg-surface-container-high transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* STEP 1: Cart list */}
        {step === "cart" && (
          <div className="flex-grow flex flex-col min-h-0">
            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Votre panier est vide</h3>
                  <p className="text-sm text-on-surface-variant/75 mt-1">
                    Parcourez notre catalogue et ajoutez des articles pour commencer.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-on-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                >
                  Continuer les achats
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable list of items */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 min-h-0">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 relative group hover:border-primary/20 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 p-2 border border-outline-variant/10">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm line-clamp-1 leading-tight group-hover:text-primary transition-colors pr-6">
                            {item.product.title}
                          </h4>
                          <span className="text-xs text-on-surface-variant block mt-0.5">
                            {item.product.price} / pièce
                          </span>
                        </div>

                        {/* Controls row */}
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity picker */}
                          <div className="flex items-center border border-outline-variant/40 rounded-lg bg-surface-container-lowest overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 px-2.5 text-primary hover:bg-surface-container-high transition-colors font-bold text-xs"
                              type="button"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-bold text-xs w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 px-2.5 text-primary hover:bg-surface-container-high transition-colors font-bold text-xs"
                              type="button"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Calculated price */}
                          <span className="font-bold text-primary text-sm">
                            {formatPrice(
                              (parseInt(item.product.price.replace(/[^\d]/g, ""), 10) || 0) * item.quantity
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="absolute top-2 right-2 text-on-surface-variant/40 hover:text-error transition-colors p-1"
                        aria-label="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Action */}
                <div className="p-5 border-t border-outline-variant/20 bg-surface-container-low space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant font-medium">Sous-total</span>
                    <span className="font-extrabold text-base">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant/75 leading-relaxed bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
                    💡 La livraison sera calculée à l&apos;étape suivante selon votre Wilaya et le type de livraison choisi.
                  </div>
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm active:scale-98 cursor-pointer"
                  >
                    Passer la commande
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2: Checkout Form */}
        {step === "checkout" && (
          <form
            onSubmit={handleSubmit(handleCheckoutSubmit)}
            className="flex-grow flex flex-col min-h-0"
          >
            {/* Scrollable Form Body */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 min-h-0">

              {/* Nom Complet */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1" htmlFor="cart-nom">
                  Nom complet *
                </label>
                <input
                  {...register("nom")}
                  className={`w-full bg-surface-container-low border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 px-3 transition-colors ${errors.nom ? "border-error focus:border-error focus:ring-error" : "border-outline-variant/40"
                    }`}
                  id="cart-nom"
                  placeholder="Fatima Zahra"
                  type="text"
                />
                {errors.nom && <p className="text-error text-[10px] mt-0.5 font-bold">{errors.nom.message}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1" htmlFor="cart-telephone">
                  Téléphone *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-on-surface-variant/60">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    {...register("telephone")}
                    className={`w-full bg-surface-container-low border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2.5 pl-9 pr-3 transition-colors ${errors.telephone ? "border-error focus:border-error focus:ring-error" : "border-outline-variant/40"
                      }`}
                    id="cart-telephone"
                    placeholder="05XX XX XX XX"
                    type="tel"
                  />
                </div>
                {errors.telephone && (
                  <p className="text-error text-[10px] mt-0.5 font-bold">{errors.telephone.message}</p>
                )}
              </div>

              {/* Wilaya / Commune */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1" htmlFor="cart-wilaya">
                    Wilaya *
                  </label>
                  <WilayaSelect
                    {...register("wilaya")}
                    error={errors.wilaya?.message}
                    id="cart-wilaya"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1" htmlFor="cart-commune">
                    Commune *
                  </label>
                  <CommuneSelect
                    {...register("commune")}
                    wilayaCode={selectedWilayaCode}
                    error={errors.commune?.message}
                    id="cart-commune"
                  />
                </div>
              </div>

              {/* Hidden fields / radio trigger for delivery type */}
              <input type="hidden" {...register("typeLivraison")} />

              {/* Mode de livraison */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">
                  Mode de livraison *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setValue("typeLivraison", "bureau", { shouldValidate: true })}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${typeLivraison === "bureau"
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : "border-outline-variant/40 hover:bg-surface-container-low text-on-surface-variant"
                      }`}
                  >
                    <span className="material-symbols-outlined text-[18px] mb-0.5">domain</span>
                    <span className="font-bold text-xs">Bureau Yalidine</span>
                    <span className="text-[9px] opacity-75 mt-0.5">Retrait en agence</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("typeLivraison", "domicile", { shouldValidate: true })}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${typeLivraison === "domicile"
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : "border-outline-variant/40 hover:bg-surface-container-low text-on-surface-variant"
                      }`}
                  >
                    <span className="material-symbols-outlined text-[18px] mb-0.5">home</span>
                    <span className="font-bold text-xs">À Domicile</span>
                    <span className="text-[9px] opacity-75 mt-0.5">Livré chez vous</span>
                  </button>
                </div>
              </div>

              {/* Adresse complete */}
              {typeLivraison === "domicile" && (
                <div className="animate-in fade-in slide-in-from-top duration-200">
                  <label className="block text-xs font-bold text-on-surface-variant mb-1" htmlFor="cart-adresse">
                    Adresse complète du domicile (facultative)
                  </label>
                  <textarea
                    {...register("adresse")}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2 px-3 transition-colors resize-none"
                    id="cart-adresse"
                    placeholder="Quartier 5 Juillet, Bâtiment C N°12"
                    rows={2}
                  />
                </div>
              )}

              {/* Note (optional) */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1" htmlFor="cart-note">
                  Instructions de livraison (facultative)
                </label>
                <textarea
                  {...register("note")}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm py-2 px-3 transition-colors resize-none"
                  id="cart-note"
                  placeholder="Ex: Appelez avant d'arriver..."
                  rows={1}
                />
              </div>

              {/* Items Summary list block */}
              <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/20 space-y-2 mt-2">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block tracking-wider">Récapitulatif des articles</span>
                <div className="space-y-1">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-xs text-on-surface-variant font-medium">
                      <span className="line-clamp-1">{item.product.title} (x{item.quantity})</span>
                      <span className="font-bold whitespace-nowrap">
                        {formatPrice(
                          (parseInt(item.product.price.replace(/[^\d]/g, ""), 10) || 0) * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Price Calculations & Submit */}
            <div className="p-5 border-t border-outline-variant/20 bg-surface-container-low space-y-3">
              <div className="space-y-1.5 text-xs text-on-surface-variant font-medium">
                <div className="flex justify-between">
                  <span>Sous-total articles</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>{selectedWilayaCode ? formatPrice(shippingCost) : "Sélectionner la wilaya"}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-primary border-t border-outline-variant/20 pt-2">
                  <span>Total à payer</span>
                  <span className="text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary text-on-primary font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm active:scale-98 cursor-pointer mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isSubmitting ? "Enregistrement en cours..." : "Confirmer ma commande"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-on-surface-variant/70 flex items-center justify-center gap-1 font-semibold">
                <Lock className="w-3 h-3" /> Paiement en espèces à la livraison (Algérie)
              </p>
            </div>
          </form>
        )}

        {/* STEP 3: Success message */}
        {step === "success" && (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center overflow-y-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-black text-primary">Merci pour votre confiance !</h3>
              <p className="text-sm text-on-surface-variant/80 mt-2 max-w-sm leading-relaxed">
                Votre commande <strong>{createdOrderId}</strong> a été enregistrée avec succès.
              </p>
            </div>

            {lastOrderDetails && (
              <div className="w-full bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 text-left space-y-2.5 text-xs">
                <div className="flex items-center gap-1.5 text-primary font-bold border-b pb-1.5 border-outline-variant/20">
                  <User className="w-3.5 h-3.5" />
                  <span>Destinataire</span>
                </div>
                <div className="space-y-1 text-on-surface-variant">
                  <div className="flex justify-between"><span className="font-medium">Nom :</span> <span className="font-bold text-on-surface">{lastOrderDetails.nom}</span></div>
                  <div className="flex justify-between"><span className="font-medium">Tél :</span> <span className="font-bold text-on-surface">{lastOrderDetails.telephone}</span></div>
                  <div className="flex justify-between">
                    <span className="font-medium">Wilaya :</span>
                    <span className="font-bold text-on-surface">
                      {algeriaData.find(w => w.code === lastOrderDetails.wilaya)?.name || lastOrderDetails.wilaya}
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="font-medium">Commune :</span> <span className="font-bold text-on-surface">{lastOrderDetails.commune}</span></div>
                  <div className="flex justify-between"><span className="font-medium">Mode :</span> <span className="font-bold text-on-surface">{lastOrderDetails.typeLivraison === "domicile" ? "À domicile" : "Bureau Yalidine"}</span></div>
                  {lastOrderDetails.adresse && (
                    <div className="pt-1 border-t border-dashed border-outline-variant/20">
                      <span className="font-medium block text-[10px] text-on-surface-variant/70 uppercase">Adresse :</span>
                      <span className="font-semibold text-on-surface block mt-0.5">{lastOrderDetails.adresse}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <p className="text-xs text-on-surface-variant/85 leading-relaxed bg-amber-500/5 text-amber-800 p-3 rounded-lg border border-amber-500/10">
              📞 Notre équipe vous appellera au <strong>{lastOrderDetails?.telephone}</strong> sous peu pour finaliser la confirmation d&apos;expédition.
            </p>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setStep("cart");
              }}
              className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-full hover:bg-primary-container transition-colors shadow-sm active:scale-98 cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
