"use client";

interface OrderSummaryProps {
  productName: string;
  unitPriceDA: number;
  quantity: number;
  wilayaCode?: string;
  wilayaName?: string;
  typeLivraison?: "bureau" | "domicile";
}

export default function OrderSummary({
  productName,
  unitPriceDA,
  quantity,
  wilayaCode,
  wilayaName,
  typeLivraison = "bureau",
}: OrderSummaryProps) {
  const formatPrice = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DA";
  };

  const totalItemPrice = unitPriceDA * quantity;
  
  // Custom shipping rate logic:
  // e.g. Alger/Oran/Constantine = 400 DA (bureau) / 650 DA (domicile)
  let shippingCost: number | null = null;
  if (wilayaCode) {
    const codeNum = parseInt(wilayaCode, 10);
    let baseRate = 700; // Standard rate
    // Alger (16), Oran (31), Constantine (25)
    if ([16, 25, 31].includes(codeNum)) {
      baseRate = 400; // Capital cities flat rate
    } else if (codeNum >= 49) {
      baseRate = 900; // Southern wilayas
    }
    
    // Add extra for home delivery
    if (typeLivraison === "domicile") {
      shippingCost = baseRate + 250;
    } else {
      shippingCost = baseRate;
    }
  }

  const grandTotal = shippingCost !== null ? totalItemPrice + shippingCost : totalItemPrice;

  return (
    <div className="bg-surface p-6 rounded-lg border border-outline-variant mt-6 select-none">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold border-b border-dashed border-outline-variant/30 pb-2">
        Résumé de la commande
      </h3>
      <div className="space-y-3 font-body-md text-on-surface-variant">
        <div className="flex justify-between items-center">
          <span className="line-clamp-1">{productName} (x{quantity})</span>
          <span className="font-semibold text-on-surface">{formatPrice(totalItemPrice)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>
            Frais de livraison ({wilayaName || "non spécifié"})
            <span className="block text-[10px] text-on-surface-variant/75 font-normal">
              Mode : {typeLivraison === "domicile" ? "À domicile" : "Au bureau (Stop Desk)"}
            </span>
          </span>
          <span className="font-semibold text-on-surface">
            {shippingCost !== null ? formatPrice(shippingCost) : "Gratuit ou calculé après"}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-dashed border-outline-variant pt-4 font-headline-md text-body-lg font-bold text-primary">
          <span>Total à payer</span>
          <span className="text-xl md:text-2xl font-black">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
