"use client";

import { Search, FileText, CheckCircle } from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "Choisissez",
    description: "Parcourez notre catalogue et sélectionnez vos articles d'outillage ou machines.",
    icon: Search,
  },
  {
    number: 2,
    title: "Consultez",
    description: "Vérifiez votre panier et les détails de vos produits de couture.",
    icon: FileText,
  },
  {
    number: 3,
    title: "Commandez",
    description: "Validez et préparez-vous à recevoir votre matériel à l'atelier.",
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-surface-container-highest via-secondary-container/20 to-surface-container-high py-16 md:py-24 relative overflow-hidden texture-linen">
      {/* Stitching lines overlays at top and bottom */}
      <div className="absolute top-0 left-0 w-full stitching-divider opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full stitching-divider opacity-50"></div>

      {/* Decorative floating sewing tools */}
      <div className="pointer-events-none select-none hidden md:block">
        {/* Large scissors top-left */}
        <div className="absolute top-6 left-6 opacity-[0.09] animate-float-slow rotate-12">
          <svg viewBox="0 0 24 24" className="w-24 h-24 text-primary fill-none stroke-current" strokeWidth="1.2">
            <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12"/>
          </svg>
        </div>
        {/* 3 scattered buttons — top area */}
        <div className="absolute top-10 right-16 opacity-[0.1] animate-float-fast">
          <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.7"/>
            <circle cx="9" cy="10" r="1.5" fill="#fff"/><circle cx="15" cy="10" r="1.5" fill="#fff"/>
            <circle cx="9" cy="14" r="1.5" fill="#fff"/><circle cx="15" cy="14" r="1.5" fill="#fff"/>
            <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="0.8"/>
          </svg>
        </div>
        <div className="absolute top-20 right-48 opacity-[0.08] animate-float-slow">
          <svg className="w-6 h-6 text-tertiary fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.7"/>
            <circle cx="9" cy="10" r="1.2" fill="#fff"/><circle cx="15" cy="10" r="1.2" fill="#fff"/>
            <circle cx="9" cy="14" r="1.2" fill="#fff"/><circle cx="15" cy="14" r="1.2" fill="#fff"/>
          </svg>
        </div>
        {/* Thimble bottom-right */}
        <div className="absolute bottom-8 right-8 opacity-[0.1] animate-float-medium">
          <svg className="w-20 h-20 text-amber-400 fill-current" viewBox="0 0 24 24">
            <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.9"/>
            <circle cx="9.5" cy="12" r="1" fill="#fff"/><circle cx="12" cy="12" r="1" fill="#fff"/>
            <circle cx="14.5" cy="12" r="1" fill="#fff"/><circle cx="9.5" cy="16" r="1" fill="#fff"/>
            <circle cx="12" cy="16" r="1" fill="#fff"/><circle cx="14.5" cy="16" r="1" fill="#fff"/>
          </svg>
        </div>
        {/* Thread spool bottom-left */}
        <div className="absolute bottom-10 left-12 opacity-[0.08] animate-float-fast">
          <svg className="w-14 h-20 text-[#980061] fill-current" viewBox="0 0 24 32">
            <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.7"/>
            <ellipse cx="12" cy="5" rx="10" ry="3" fill="#ffdbe8"/>
            <ellipse cx="12" cy="27" rx="10" ry="3" fill="#ffdbe8"/>
            <path d="M4 12h16M4 17h16M4 22h16" stroke="#fff" strokeWidth="1.2"/>
          </svg>
        </div>
        {/* Wavy thread line across center */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-[0.05]">
          <svg viewBox="0 0 1200 20" className="w-full h-5 text-primary" preserveAspectRatio="none">
            <path d="M0 10 C100 0, 200 20, 300 10 C400 0, 500 20, 600 10 C700 0, 800 20, 900 10 C1000 0, 1100 20, 1200 10"
              fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <h2 className="font-headline-lg text-center text-primary font-bold mb-4 drop-shadow-sm">
          Procédure de Commande
        </h2>
        <p className="text-center text-on-surface-variant max-w-xl mx-auto mb-16 text-lg">
          Simple, rapide et transparent. Découvrez comment nous préparons votre commande avec soin.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12 relative">
          
          {/* Connecting dashed line in background (desktop) */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[16.6%] right-[16.6%] h-px border-t-2 border-dashed border-primary/30 z-0"></div>

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex-1 flex flex-col items-center text-center relative z-10 bg-surface/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-outline-variant/50 hover:shadow-lg hover:border-primary/40 transition-all duration-300 group"
              >
                {/* Round step badge with bottom-right sub-icon */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tertiary to-tertiary-container text-on-tertiary flex items-center justify-center font-headline-lg shadow-md mb-6 relative group-hover:scale-110 transition-transform duration-300 border-4 border-surface">
                  {step.number}
                  
                  {/* Small sub-icon */}
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2.5 shadow-md text-on-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-headline-md text-primary mb-3 font-bold group-hover:text-tertiary transition-colors">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant text-base max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
