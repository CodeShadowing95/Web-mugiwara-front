import React from "react";
import ProductImage from "@/app-components/atoms/ProductImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  images: { id: number; src: string; alt: string }[];
  tags?: { name: string; bgColor?: string; textColor?: string }[];
  currentImageIndex: number;
  onImageChange: (index: number) => void;
  isZoomed?: boolean;
  zoomPosition?: { x: number; y: number };
  onZoom?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: () => void;
}

export default function ProductGallery({ images, tags, currentImageIndex, onImageChange, isZoomed, zoomPosition, onZoom, onMouseMove, onMouseLeave }: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 aspect-square">
        <ProductImage
          src={images[currentImageIndex].src || "https://api.dicebear.com/9.x/shapes/svg?seed=Felix"}
          alt={images[currentImageIndex].alt}
          isZoomed={isZoomed}
          zoomPosition={zoomPosition}
          onClick={onZoom}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        />
        {tags && tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`px-3 py-1 flex items-center ${tag.bgColor ? `bg-[${tag.bgColor}]` : ''} ${tag.textColor ? `text-[${tag.textColor}]` : ''}`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onImageChange(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
              }}
            >
              <ChevronLeft size={20} className="text-farm-green-dark dark:text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onImageChange(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
              }}
            >
              <ChevronRight size={20} className="text-farm-green-dark dark:text-white" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`relative rounded-lg overflow-hidden border-2 flex-shrink-0 w-20 h-20 transition-all ${index === currentImageIndex ? "border-farm-green-dark dark:border-farm-green-light" : "border-transparent hover:border-farm-green/50 dark:hover:border-farm-green-light/50"}`}
              onClick={() => onImageChange(index)}
            >
              <ProductImage src={image.src} alt={image.alt} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 