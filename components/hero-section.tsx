"use client";

import Image from "next/image";
import { Ruler, Scissors, ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <header className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Floating sewing elements background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-fixed/20 via-background to-surface overflow-hidden">
          {/* Subtle textured grid or stitching pattern */}
          <div className="absolute inset-0 opacity-[0.03] texture-linen"></div>

          {/* Subtle grid of stitching lines (horizontal and vertical dotted lines) */}
          <svg className="absolute inset-0 w-full h-full stroke-primary/10" strokeDasharray="4 4" fill="none">
            <line x1="10%" y1="0" x2="10%" y2="100%" />
            <line x1="30%" y1="0" x2="30%" y2="100%" />
            <line x1="50%" y1="0" x2="50%" y2="100%" />
            <line x1="70%" y1="0" x2="70%" y2="100%" />
            <line x1="90%" y1="0" x2="90%" y2="100%" />

            <line x1="0" y1="20%" x2="100%" y2="20%" />
            <line x1="0" y1="40%" x2="100%" y2="40%" />
            <line x1="0" y1="60%" x2="100%" y2="60%" />
            <line x1="0" y1="80%" x2="100%" y2="80%" />
          </svg>

          {/* Floating background items with low opacity and slow movement */}
          <div className="absolute inset-0 pointer-events-none select-none">

            {/* Scissor 1: Top Left */}
            <div className="absolute left-[8%] top-[12%] animate-float-slow opacity-20 rotate-45 scale-90 md:scale-110">
              <Scissors className="w-12 h-12 text-primary" />
            </div>

            {/* Thread Spool 1: Top Right */}
            <div className="absolute right-[10%] top-[15%] animate-float-medium opacity-20 -rotate-12 scale-90 md:scale-110">
              <svg className="w-10 h-14 text-[#bd1e7c] fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="12" height="16" rx="1" fill="currentColor" opacity="0.8" />
                <ellipse cx="12" cy="3" rx="8" ry="2" fill="#ffdbe8" />
                <ellipse cx="12" cy="21" rx="8" ry="2" fill="#ffdbe8" />
                <path d="M6 7h12M6 10h12M6 13h12M6 16h12" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>

            {/* Button 1 (Pink): Bottom Center-Left */}
            <div className="absolute left-[30%] bottom-[12%] animate-spin-slow opacity-15 scale-75 md:scale-100">
              <svg className="w-12 h-12 text-primary fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="8" />
                <circle cx="9" cy="9" r="1.5" fill="#f9f9f9" />
                <circle cx="15" cy="9" r="1.5" fill="#f9f9f9" />
                <circle cx="9" cy="15" r="1.5" fill="#f9f9f9" />
                <circle cx="15" cy="15" r="1.5" fill="#f9f9f9" />
              </svg>
            </div>

            {/* Button 2 (Gold): Top Center-Left */}
            <div className="absolute left-[35%] top-[8%] animate-float-fast opacity-15 scale-75">
              <svg className="w-8 h-8 text-tertiary fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="8" />
                <circle cx="10" cy="12" r="1.5" fill="#f9f9f9" />
                <circle cx="14" cy="12" r="1.5" fill="#f9f9f9" />
              </svg>
            </div>

            {/* Measuring Tape / Ruler 1: Middle Right */}
            <div className="absolute right-[15%] top-[50%] animate-float-drift opacity-15 rotate-12 scale-90 md:scale-110">
              <Ruler className="w-12 h-12 text-tertiary" />
            </div>

            {/* Thimble: Bottom Right */}
            <div className="absolute right-[8%] bottom-[22%] animate-float-slow opacity-25 -rotate-45 scale-90 md:scale-110">
              <svg className="w-10 h-10 text-amber-500 fill-current" viewBox="0 0 24 24">
                <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.8" />
                <ellipse cx="12" cy="9" rx="3" ry="1" fill="#fff" opacity="0.3" />
                <circle cx="10" cy="13" r="0.8" fill="#fff" />
                <circle cx="12" cy="13" r="0.8" fill="#fff" />
                <circle cx="14" cy="13" r="0.8" fill="#fff" />
                <circle cx="9.5" cy="16" r="0.8" fill="#fff" />
                <circle cx="12" cy="16" r="0.8" fill="#fff" />
                <circle cx="14.5" cy="16" r="0.8" fill="#fff" />
              </svg>
            </div>

            {/* Sewing Needle with Thread: Middle Left */}
            <div className="absolute left-[5%] top-[45%] animate-float-drift opacity-20 -rotate-12 scale-90 md:scale-110">
              <svg className="w-8 h-24 text-secondary fill-current" viewBox="0 0 12 36">
                <path d="M5.5 0 C5.5 0 4 1 4 3 L4 28 L5.5 32 L7 28 L7 3 C7 1 6.5 0 5.5 0Z" opacity="0.8" />
                <ellipse cx="5.5" cy="4" rx="1.2" ry="2.2" fill="#f9f9f9" />
                <path d="M5.5 4 Q-5 10 5 18 T15 30" stroke="#bd1e7c" strokeWidth="1.2" fill="none" opacity="0.9" />
              </svg>
            </div>

            {/* Mannequin / Dress Form: Bottom Center-Right */}
            <div className="absolute right-[32%] bottom-[8%] animate-float-slow opacity-10 scale-90 md:scale-110">
              <svg className="w-16 h-28 text-secondary fill-none stroke-current" viewBox="0 0 32 64" strokeWidth="1.5">
                <path d="M16 6 L16 10 M12 10 L20 10 M12 10 C10 13 8 18 8 24 C8 30 11 32 12 36 L11 48 L21 48 L20 36 C21 32 24 30 24 24 C24 18 22 13 20 10 Z" />
                <path d="M16 48 L16 60 M10 60 L22 60" />
              </svg>
            </div>

            {/* Sewing Machine: Top Center-Right */}
            <div className="absolute right-[35%] top-[12%] animate-float-medium opacity-10 scale-75 md:scale-90">
              <svg className="w-16 h-12 text-primary fill-none stroke-current" viewBox="0 0 32 24" strokeWidth="1.5">
                <path d="M4 20 H28 M6 20 V8 H18 V20 M18 8 H26 V12 H22 V14 H26 V20 M18 10 H22 M26 11 A2 2 0 1 1 26 15 A2 2 0 1 1 26 11 Z" />
              </svg>
            </div>

            {/* Safety Pin: Bottom Left */}
            <div className="absolute left-[8%] bottom-[20%] animate-float-fast opacity-15 rotate-45 scale-75 md:scale-90">
              <svg className="w-8 h-16 text-secondary fill-none stroke-current" viewBox="0 0 16 32" strokeWidth="1.5">
                <path d="M6 4 V28 C6 29.5 7.5 31 9 31 C10.5 31 12 29.5 12 28 V12 M12 6 V4 C12 2.5 10.5 1 9 1 C7.5 1 6 2.5 6 4" />
                <path d="M6 4 H12 V10 H6 Z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>

            {/* Soft fading overlays for perfect text contrast */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--color-surface)_95%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"></div>
          </div>
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center">

          {/* Large Logo Container with floating elements */}
          <div className="relative w-72 h-36 sm:w-96 sm:h-48 md:w-130 md:h-64 mb-6 select-none flex items-center justify-center">

            {/* Floating Left: Scissors */}
            <div className="absolute -left-12 top-1/4 sm:-left-16 md:-left-20 animate-float-slow pointer-events-none drop-shadow-sm">
              <Scissors className="w-8 h-8 md:w-14 md:h-14 text-primary/70 stroke-[1.5]" />
            </div>

            {/* Floating Right: Thread Spool */}
            <div className="absolute -right-12 top-1/3 sm:-right-16 md:-right-20 animate-float-medium pointer-events-none drop-shadow-sm">
              <svg className="w-8 h-10 md:w-12 md:h-16 text-[#bd1e7c] fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="12" height="16" rx="1" fill="currentColor" opacity="0.8" />
                <ellipse cx="12" cy="3" rx="8" ry="2" fill="#ffdbe8" />
                <ellipse cx="12" cy="21" rx="8" ry="2" fill="#ffdbe8" />
                <path d="M6 7h12M6 10h12M6 13h12M6 16h12" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>

            {/* Floating Bottom Left: Tape Measure */}
            <div className="absolute -left-6 bottom-0 sm:-left-10 md:-left-12 animate-float-fast pointer-events-none drop-shadow-sm">
              <Ruler className="w-8 h-8 md:w-12 md:h-12 text-tertiary/70 stroke-[1.5]" />
            </div>

            {/* Floating Top Right: Thimble */}
            <div className="absolute -right-6 top-0 sm:-right-10 md:-right-12 animate-float-slow pointer-events-none drop-shadow-sm">
              <svg className="w-7 h-7 md:w-10 md:h-10 text-amber-500 fill-current" viewBox="0 0 24 24">
                <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.8" />
                <ellipse cx="12" cy="9" rx="3" ry="1" fill="#fff" opacity="0.3" />
                <circle cx="10" cy="13" r="0.8" fill="#fff" />
                <circle cx="12" cy="13" r="0.8" fill="#fff" />
                <circle cx="14" cy="13" r="0.8" fill="#fff" />
                <circle cx="9.5" cy="16" r="0.8" fill="#fff" />
                <circle cx="12" cy="16" r="0.8" fill="#fff" />
                <circle cx="14.5" cy="16" r="0.8" fill="#fff" />
              </svg>
            </div>

            {/* Main Logo */}
            <Image
              src="/images/logo_clean.png"
              alt="Boutique Farah Logo"
              fill
              className="object-contain drop-shadow-md"
              priority
              unoptimized
            />
          </div>

          <p className="font-body-lg text-on-surface-variant mb-8 max-w-2xl text-balance">
            Tout le matériel de couture et d’outillage pour vos besoins professionnels et personnels
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#produits"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Voir les produits
            </a>
            <a
              href="/boutique"
              className="flex items-center gap-2 bg-surface/90 backdrop-blur-sm text-primary border-2 border-primary px-8 py-4 rounded-full font-label-md text-label-md shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              Boutique
            </a>
          </div>
        </div>
      </header>

      {/* Decorative Divider with Ruler Markings */}
      <div className="w-full max-w-5xl mx-auto py-12 md:py-20">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-32 bg-outline-variant"></div>
          <Ruler className="text-outline w-5 h-5" />
          <div className="h-px w-32 bg-outline-variant"></div>
        </div>
      </div>
    </>
  );
}
