"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Avant",
  afterLabel = "Après",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-soft cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Image Après (en dessous) */}
      <img
        src={afterImage}
        alt="Après"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Label Après */}
      <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-slate-800 rounded-full shadow-sm z-10">
        {afterLabel}
      </span>

      {/* Image Avant (au-dessus, clippée) */}
      <div
        className="absolute inset-0 h-full overflow-hidden z-20"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Avant"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: "100cqw" }} // fallback
          draggable={false}
        />
        {/* Label Avant */}
        <span className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm">
          {beforeLabel}
        </span>
      </div>

      {/* Ligne et Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-30 flex items-center justify-center pointer-events-none transition-transform duration-75"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.2)] text-violet-600">
          <MoveHorizontal size={20} />
        </div>
      </div>
    </div>
  );
}
