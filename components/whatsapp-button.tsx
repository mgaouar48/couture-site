"use client";

export default function WhatsAppButton() {
  const phone = "213XXXXXXXXX"; // Replace with real number
  const message = encodeURIComponent(
    "Bonjour Boutique Farah ! Je suis intéressé(e) par vos produits de couture."
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-cta"
      aria-label="Contacter Boutique Farah sur WhatsApp"
      className="
        fixed bottom-6 right-5 z-50
        flex items-center gap-2.5
        bg-[#25D366] hover:bg-[#128C7E] text-white
        pl-3 pr-4 py-3 rounded-full
        shadow-2xl hover:shadow-green-400/40
        transition-all duration-300 group
        active:scale-95
      "
    >
      {/* WhatsApp SVG */}
      <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current drop-shadow-sm" aria-hidden="true">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.737 5.474 2.026 7.774L0 32l8.463-2.003A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.25 13.25 0 0 1-6.79-1.866l-.488-.29-5.02 1.188 1.218-4.89-.317-.498A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667c7.365 0 13.333 5.969 13.333 13.333S23.365 29.333 16 29.333z"/>
          <path d="M23.333 19.292c-.392-.196-2.316-1.143-2.674-1.272-.358-.13-.618-.196-.878.196-.26.392-1.01 1.272-1.238 1.532-.228.26-.456.293-.848.098-.392-.196-1.655-.61-3.152-1.943-1.165-1.038-1.95-2.32-2.18-2.712-.228-.392-.024-.604.172-.8.177-.176.392-.456.588-.684.196-.228.26-.392.392-.652.13-.26.065-.49-.033-.684-.098-.196-.878-2.116-1.203-2.9-.317-.762-.64-.657-.878-.67-.228-.013-.49-.016-.75-.016s-.684.098-.1043.49c-.358.392-1.37 1.34-1.37 3.262 0 1.923 1.403 3.782 1.598 4.043.196.26 2.76 4.213 6.687 5.907.934.403 1.662.643 2.23.823.935.298 1.787.256 2.46.156.75-.112 2.316-.947 2.64-1.862.326-.915.326-1.7.228-1.862-.098-.163-.358-.26-.75-.456z"/>
        </svg>
      </span>

      {/* Label — visible on hover (desktop) */}
      <span className="text-sm font-bold hidden sm:block whitespace-nowrap">
        Nous contacter
      </span>

      {/* Pulse ring */}
      <span className="absolute -inset-1 rounded-full animate-ping bg-[#25D366] opacity-20 pointer-events-none" />
    </a>
  );
}
