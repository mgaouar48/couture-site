"use client";

import { Truck, CreditCard, MessageSquare, Ruler, Scissors } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 relative">

      {/* Decorative side elements outside the card */}
      <div className="pointer-events-none select-none hidden md:block">
        {/* Left: scissors going down */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-[0.08] animate-float-medium -rotate-90">
          <Scissors className="w-14 h-14 text-primary stroke-[1.5]" />
        </div>
        {/* Right: ruler going down */}
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-[0.08] animate-float-slow rotate-90">
          <Ruler className="w-14 h-14 text-tertiary stroke-[1.5]" />
        </div>
        {/* Top-center: small needle */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-[0.07] animate-float-fast -rotate-12">
          <svg className="w-4 h-20 text-primary fill-current" viewBox="0 0 8 48">
            <path d="M3.5 0 C3 0 2 1 2 2 L2 42 L3.5 48 L5 42 L5 2 C5 1 4 0 3.5 0Z" opacity="0.9"/>
            <ellipse cx="3.5" cy="3.5" rx="2" ry="2" fill="#ffdbe8"/>
          </svg>
        </div>
      </div>

      <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/50 shadow-sm relative overflow-hidden">

        {/* Decorative background elements — absolutely positioned, outside grid flow */}
        <div className="pointer-events-none select-none absolute inset-0">
          {/* Large ruler top-right */}
          <Ruler className="absolute -top-4 -right-4 w-28 h-28 text-tertiary-container opacity-20 transform rotate-45" />

          {/* Bottom-left spool */}
          <div className="absolute -bottom-6 -left-6 opacity-[0.06] animate-float-slow">
            <svg className="w-24 h-32 text-[#bd1e7c] fill-current" viewBox="0 0 24 32">
              <rect x="4" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.7"/>
              <ellipse cx="12" cy="5" rx="10" ry="3" fill="#ffdbe8"/>
              <ellipse cx="12" cy="27" rx="10" ry="3" fill="#ffdbe8"/>
              <path d="M4 12h16M4 17h16M4 22h16" stroke="#fff" strokeWidth="1.2"/>
            </svg>
          </div>

          {/* Scattered buttons */}
          <div className="absolute top-3 left-8 opacity-[0.09] animate-float-medium">
            <svg className="w-7 h-7 text-primary fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.6"/>
              <circle cx="9" cy="10" r="1.4" fill="#fff"/><circle cx="15" cy="10" r="1.4" fill="#fff"/>
              <circle cx="9" cy="14" r="1.4" fill="#fff"/><circle cx="15" cy="14" r="1.4" fill="#fff"/>
              <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="0.7"/>
            </svg>
          </div>
          <div className="absolute bottom-4 right-12 opacity-[0.07] animate-float-slow">
            <svg className="w-5 h-5 text-tertiary fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.6"/>
              <circle cx="9" cy="10" r="1.2" fill="#fff"/><circle cx="15" cy="10" r="1.2" fill="#fff"/>
              <circle cx="9" cy="14" r="1.2" fill="#fff"/><circle cx="15" cy="14" r="1.2" fill="#fff"/>
            </svg>
          </div>

          {/* Dashed stitching border */}
          <div className="absolute inset-3 rounded-xl border-2 border-dashed border-outline-variant/30" />
        </div>

        {/* Cards row — correct 3-column grid inside the wrapper */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="flex flex-row items-center text-left gap-4">
            <div className="w-14 h-14 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-sm">
              <Truck className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-label-md text-on-surface uppercase tracking-wider">
                Livraison rapide
              </h4>
              <p className="text-sm text-on-surface-variant">
                Partout sur le territoire.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-row items-center text-left gap-4">
            <div className="w-14 h-14 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-sm">
              <CreditCard className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-label-md text-on-surface uppercase tracking-wider">
                Paiement à la livraison
              </h4>
              <p className="text-sm text-on-surface-variant">
                Sécurité et tranquillité.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-row items-center text-left gap-4">
            <div className="w-14 h-14 shrink-0 rounded-full bg-secondary-container flex items-center justify-center shadow-sm">
              <MessageSquare className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-label-md text-on-surface uppercase tracking-wider">
                Assistance WhatsApp
              </h4>
              <p className="text-sm text-on-surface-variant">
                Un conseil ? Nous sommes là.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
