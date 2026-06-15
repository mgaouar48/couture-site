"use client";

import Image from "next/image";
import { Scissors, Ruler } from "lucide-react";

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32" style={{ background: "linear-gradient(135deg, #6b003e 0%, #980061 40%, #bd1e7c 70%, #6b003e 100%)" }}>

      {/* ── Arrière-plan : nombreux outils animés ── */}
      <div className="pointer-events-none select-none absolute inset-0">

        {/* Grande paire de ciseaux — haut gauche */}
        <div className="absolute -top-6 -left-10 opacity-[0.18] animate-float-slow rotate-[-20deg]">
          <Scissors className="w-52 h-52 text-white stroke-[0.8]" />
        </div>

        {/* Grande règle — bas droite */}
        <div className="absolute -bottom-8 -right-8 opacity-[0.15] animate-float-medium rotate-[20deg]">
          <Ruler className="w-60 h-60 text-white stroke-[0.8]" />
        </div>

        {/* Ciseaux moyens — centre droite */}
        <div className="absolute top-[20%] right-[8%] opacity-[0.14] animate-float-drift rotate-[10deg]">
          <Scissors className="w-28 h-28 text-white stroke-[1]" />
        </div>

        {/* Petits ciseaux — bas gauche */}
        <div className="absolute bottom-[15%] left-[6%] opacity-[0.12] animate-float-fast rotate-[-35deg]">
          <Scissors className="w-20 h-20 text-white stroke-[1.2]" />
        </div>

        {/* Règle centre-gauche */}
        <div className="absolute top-[40%] left-[5%] opacity-[0.12] animate-float-slow -rotate-[60deg]">
          <Ruler className="w-24 h-24 text-amber-300 stroke-[1]" />
        </div>

        {/* Bobine de fil — gauche centre */}
        <div className="absolute left-[10%] top-[55%] opacity-[0.18] animate-float-drift">
          <svg className="w-20 h-28 text-white fill-current" viewBox="0 0 24 32">
            <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.9"/>
            <ellipse cx="12" cy="5" rx="10" ry="3" fill="#ffdbe8" opacity="0.9"/>
            <ellipse cx="12" cy="27" rx="10" ry="3" fill="#ffdbe8" opacity="0.9"/>
            <path d="M4 12h16M4 17h16M4 22h16" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4"/>
          </svg>
        </div>

        {/* Bobine de fil — droite bas */}
        <div className="absolute right-[12%] bottom-[20%] opacity-[0.14] animate-float-slow">
          <svg className="w-14 h-20 text-white fill-current" viewBox="0 0 24 32">
            <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.8"/>
            <ellipse cx="12" cy="5" rx="10" ry="3" fill="#ffdbe8" opacity="0.9"/>
            <ellipse cx="12" cy="27" rx="10" ry="3" fill="#ffdbe8" opacity="0.9"/>
            <path d="M4 12h16M4 17h16M4 22h16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4"/>
          </svg>
        </div>

        {/* Bobine — haut droite */}
        <div className="absolute top-[10%] right-[25%] opacity-[0.13] animate-float-medium">
          <svg className="w-10 h-14 text-amber-300 fill-current" viewBox="0 0 24 32">
            <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.9"/>
            <ellipse cx="12" cy="5" rx="10" ry="3" fill="#fff" opacity="0.6"/>
            <ellipse cx="12" cy="27" rx="10" ry="3" fill="#fff" opacity="0.6"/>
            <path d="M4 12h16M4 17h16M4 22h16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
          </svg>
        </div>

        {/* Dé à coudre — haut centre-droite */}
        <div className="absolute top-[8%] right-[18%] opacity-[0.18] animate-float-slow">
          <svg className="w-16 h-16 text-amber-300 fill-current" viewBox="0 0 24 24">
            <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.9"/>
            <circle cx="9.5" cy="12" r="1.1" fill="#fff"/><circle cx="12" cy="12" r="1.1" fill="#fff"/>
            <circle cx="14.5" cy="12" r="1.1" fill="#fff"/><circle cx="9.5" cy="16" r="1.1" fill="#fff"/>
            <circle cx="12" cy="16" r="1.1" fill="#fff"/><circle cx="14.5" cy="16" r="1.1" fill="#fff"/>
          </svg>
        </div>

        {/* Dé à coudre — bas gauche */}
        <div className="absolute bottom-[30%] left-[25%] opacity-[0.13] animate-float-fast">
          <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
            <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.8"/>
            <circle cx="9.5" cy="13" r="0.9" fill="#fff"/><circle cx="12" cy="13" r="0.9" fill="#fff"/>
            <circle cx="14.5" cy="13" r="0.9" fill="#fff"/>
          </svg>
        </div>

        {/* Boutons couture — plusieurs */}
        <div className="absolute top-[25%] left-[18%] opacity-[0.18] animate-float-fast">
          <svg className="w-12 h-12 text-white fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.7"/>
            <circle cx="9" cy="10" r="1.6" fill="#fff"/><circle cx="15" cy="10" r="1.6" fill="#fff"/>
            <circle cx="9" cy="14" r="1.6" fill="#fff"/><circle cx="15" cy="14" r="1.6" fill="#fff"/>
            <circle cx="12" cy="12" r="5.5" fill="none" stroke="#fff" strokeWidth="0.8"/>
          </svg>
        </div>
        <div className="absolute bottom-[10%] right-[30%] opacity-[0.13] animate-float-medium">
          <svg className="w-8 h-8 text-amber-300 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.7"/>
            <circle cx="9" cy="10" r="1.3" fill="#fff"/><circle cx="15" cy="10" r="1.3" fill="#fff"/>
            <circle cx="9" cy="14" r="1.3" fill="#fff"/><circle cx="15" cy="14" r="1.3" fill="#fff"/>
          </svg>
        </div>
        <div className="absolute top-[55%] right-[22%] opacity-[0.12] animate-float-slow">
          <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.6"/>
            <circle cx="9" cy="10" r="1.2" fill="#fff"/><circle cx="15" cy="10" r="1.2" fill="#fff"/>
            <circle cx="9" cy="14" r="1.2" fill="#fff"/><circle cx="15" cy="14" r="1.2" fill="#fff"/>
          </svg>
        </div>

        {/* Aiguille avec fil — centre haut */}
        <div className="absolute top-[5%] left-[45%] opacity-[0.15] animate-float-medium -rotate-12">
          <svg className="w-4 h-24 text-white fill-current" viewBox="0 0 8 48">
            <path d="M3.5 0 C3 0 2 1 2 2 L2 42 L3.5 48 L5 42 L5 2 C5 1 4 0 3.5 0Z" opacity="0.9"/>
            <ellipse cx="3.5" cy="3.5" rx="2" ry="2" fill="#ffdbe8"/>
          </svg>
        </div>

        {/* Ligne de fil ondulée — en bas */}
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.10]">
          <svg viewBox="0 0 1200 28" className="w-full h-7" preserveAspectRatio="none">
            <path d="M0 14 C100 2, 200 26, 300 14 C400 2, 500 26, 600 14 C700 2, 800 26, 900 14 C1000 2, 1100 26, 1200 14"
              fill="none" stroke="white" strokeWidth="2.5"/>
          </svg>
        </div>

        {/* Bordure en pointillés couture */}
        <div className="absolute inset-5 rounded-3xl border-2 border-dashed border-white/10 pointer-events-none" />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">

        {/* ── Logo identique à la landing page — outils flottants autour ── */}
        <div className="flex justify-center mb-10">
          <div className="relative w-72 h-36 sm:w-96 sm:h-48 md:w-[520px] md:h-64 select-none flex items-center justify-center">

            {/* Flottant gauche : Ciseaux */}
            <div className="absolute -left-12 top-1/4 sm:-left-16 md:-left-20 animate-float-slow pointer-events-none drop-shadow-sm">
              <Scissors className="w-8 h-8 md:w-14 md:h-14 text-white/70 stroke-[1.5]" />
            </div>

            {/* Flottant droit : Bobine de fil */}
            <div className="absolute -right-12 top-1/3 sm:-right-16 md:-right-20 animate-float-medium pointer-events-none drop-shadow-sm">
              <svg className="w-8 h-10 md:w-12 md:h-16 text-amber-300 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="12" height="16" rx="1" fill="currentColor" opacity="0.85" />
                <ellipse cx="12" cy="3" rx="8" ry="2" fill="#ffdbe8" />
                <ellipse cx="12" cy="21" rx="8" ry="2" fill="#ffdbe8" />
                <path d="M6 7h12M6 10h12M6 13h12M6 16h12" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              </svg>
            </div>

            {/* Flottant bas-gauche : Règle */}
            <div className="absolute -left-6 bottom-0 sm:-left-10 md:-left-12 animate-float-fast pointer-events-none drop-shadow-sm">
              <Ruler className="w-8 h-8 md:w-12 md:h-12 text-white/65 stroke-[1.5]" />
            </div>

            {/* Flottant haut-droit : Dé à coudre */}
            <div className="absolute -right-6 top-0 sm:-right-10 md:-right-12 animate-float-slow pointer-events-none drop-shadow-sm">
              <svg className="w-7 h-7 md:w-10 md:h-10 text-amber-300 fill-current" viewBox="0 0 24 24">
                <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.85" />
                <ellipse cx="12" cy="9" rx="3" ry="1" fill="#fff" opacity="0.3" />
                <circle cx="10" cy="13" r="0.8" fill="#fff" />
                <circle cx="12" cy="13" r="0.8" fill="#fff" />
                <circle cx="14" cy="13" r="0.8" fill="#fff" />
                <circle cx="9.5" cy="16" r="0.8" fill="#fff" />
                <circle cx="12" cy="16" r="0.8" fill="#fff" />
                <circle cx="14.5" cy="16" r="0.8" fill="#fff" />
              </svg>
            </div>

            {/* Logo principal — halo blanc pour visibilité sur fond sombre */}
            <Image
              src="/images/logo_pink_white.png"
              alt="Boutique Farah Logo"
              fill
              className="object-contain"
              priority
              unoptimized
              style={{
                filter: "drop-shadow(0 0 24px rgba(255,255,255,0.7)) drop-shadow(0 0 8px rgba(255,255,255,0.5)) brightness(1.2) contrast(1.1)",
              }}
            />
          </div>
        </div>

        {/* Titre principal — lisible sur fond rose foncé */}
        <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
          Tout le matériel de couture
          <span className="block mt-2" style={{ color: "#ffdbe8" }}>
            au même endroit
          </span>
        </h1>

        {/* Sous-titre — contraste renforcé */}
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
          Machines, ciseaux, règles, kits et accessoires&nbsp;— tout ce dont votre atelier a besoin, livré chez vous.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { value: "60+", label: "Produits" },
            { value: "100%", label: "Qualité garantie" },
            { value: "48h", label: "Livraison" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-white" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                {stat.value}
              </div>
              <div className="text-white/70 text-sm mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
