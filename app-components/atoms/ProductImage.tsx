import Image from "next/image";
import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  isZoomed?: boolean;
  zoomPosition?: { x: number; y: number };
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: () => void;
  className?: string;
}

export default function ProductImage({ src, alt, isZoomed, zoomPosition, onClick, onMouseMove, onMouseLeave, className = "" }: ProductImageProps) {
  return (
    <div
      className={`w-full h-full transition-transform duration-200 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"} ${className}`}
      style={isZoomed && zoomPosition ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="w-full h-full object-contain"
      />
    </div>
  );
} 