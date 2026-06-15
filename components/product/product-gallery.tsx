"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImage: string;
  title: string;
  badge?: string;
  additionalImages?: string[];
}

export default function ProductGallery({
  mainImage,
  title,
  badge = "En Stock",
  additionalImages = [],
}: ProductGalleryProps) {
  const images = [mainImage, ...additionalImages];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View */}
      <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm stitched-border relative group flex items-center justify-center p-6 select-none">
        <div className="relative w-full h-full">
          <Image
            src={images[activeIdx]}
            alt={title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority
            unoptimized
          />
        </div>
        {badge && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-tertiary-container text-on-tertiary-container px-3.5 py-1 rounded-full text-label-sm font-label-sm shadow-sm inline-flex items-center gap-1.5 border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`aspect-square bg-white rounded-lg overflow-hidden border p-1 transition-all duration-200 cursor-pointer ${
                activeIdx === idx
                  ? "border-2 border-primary"
                  : "border-outline-variant hover:border-primary/50"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
