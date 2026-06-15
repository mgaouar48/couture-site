"use client";

import Image from "next/image";
import { Scissors, Ruler } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest full-width relative overflow-hidden" id="contact">

      {/* Stitched top border */}
      <div className="w-full stitching-divider opacity-60" />

      {/* Decorative floating tools in footer */}
      <div className="pointer-events-none select-none hidden md:block">
        {/* Scissors far left */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-[0.07] animate-float-slow -rotate-12">
          <Scissors className="w-12 h-12 text-primary stroke-[1.5]" />
        </div>
        {/* Ruler far right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.07] animate-float-medium rotate-6">
          <Ruler className="w-12 h-12 text-tertiary stroke-[1.5]" />
        </div>
        {/* Thimble center-left */}
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 opacity-[0.07] animate-float-fast">
          <svg className="w-8 h-8 text-amber-500 fill-current" viewBox="0 0 24 24">
            <path d="M7 21h10l-1.5-12a4 4 0 0 0-7 0L7 21z" opacity="0.9"/>
            <circle cx="10" cy="13" r="0.9" fill="#fff"/><circle cx="12" cy="13" r="0.9" fill="#fff"/>
            <circle cx="14" cy="13" r="0.9" fill="#fff"/>
          </svg>
        </div>
        {/* Mini spool center-right */}
        <div className="absolute right-[22%] top-1/2 -translate-y-1/2 opacity-[0.07] animate-float-slow">
          <svg className="w-6 h-9 text-[#bd1e7c] fill-current" viewBox="0 0 24 32">
            <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.7"/>
            <ellipse cx="12" cy="5" rx="10" ry="3" fill="#ffdbe8"/>
            <ellipse cx="12" cy="27" rx="10" ry="3" fill="#ffdbe8"/>
            <path d="M4 13h16M4 19h16" stroke="#fff" strokeWidth="1.5"/>
          </svg>
        </div>
        {/* Button left-center */}
        <div className="absolute left-[35%] top-3 opacity-[0.07] animate-float-medium">
          <svg className="w-5 h-5 text-primary fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.6"/>
            <circle cx="9" cy="10" r="1.2" fill="#fff"/><circle cx="15" cy="10" r="1.2" fill="#fff"/>
            <circle cx="9" cy="14" r="1.2" fill="#fff"/><circle cx="15" cy="14" r="1.2" fill="#fff"/>
          </svg>
        </div>
        {/* Button right-center */}
        <div className="absolute right-[35%] bottom-3 opacity-[0.06] animate-float-slow">
          <svg className="w-4 h-4 text-tertiary fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.6"/>
            <circle cx="9" cy="10" r="1.1" fill="#fff"/><circle cx="15" cy="10" r="1.1" fill="#fff"/>
            <circle cx="9" cy="14" r="1.1" fill="#fff"/><circle cx="15" cy="14" r="1.1" fill="#fff"/>
          </svg>
        </div>
        {/* Wavy thread across footer */}
        <div className="absolute bottom-0 left-0 right-0 opacity-[0.04]">
          <svg viewBox="0 0 1200 16" className="w-full h-4 text-primary" preserveAspectRatio="none">
            <path d="M0 8 C150 0, 300 16, 450 8 C600 0, 750 16, 900 8 C1050 0, 1150 16, 1200 8"
              fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-base w-full max-w-container-max mx-auto relative z-10">

        {/* Left branding area */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="relative w-36 h-10 mx-auto md:mx-0 select-none mb-1">
            <Image
              src="/images/logo_clean.png"
              alt="Boutique Farah Logo"
              fill
              className="object-contain object-left"
              unoptimized
            />
          </div>
          <div className="font-label-sm text-label-sm text-secondary">
            © 2024 Boutique Farah. L&apos;excellence artisanale à chaque point.
          </div>
        </div>

        {/* Right navigation links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-label-sm text-label-sm text-secondary hover:text-tertiary opacity-80 hover:opacity-100 transition-opacity" href="#">
            Politique de confidentialité
          </a>
          <a className="font-label-sm text-label-sm text-secondary hover:text-tertiary opacity-80 hover:opacity-100 transition-opacity" href="#">
            Conditions d&apos;utilisation
          </a>
          <a className="font-label-sm text-label-sm text-secondary hover:text-tertiary opacity-80 hover:opacity-100 transition-opacity" href="#">
            Livraison &amp; Retours
          </a>
          <a className="font-label-sm text-label-sm text-secondary hover:text-tertiary opacity-80 hover:opacity-100 transition-opacity" href="#">
            Assistance
          </a>
        </div>

      </div>
    </footer>
  );
}
