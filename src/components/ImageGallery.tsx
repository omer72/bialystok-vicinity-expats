'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

type DisplayMode = 'grid' | 'carousel';

interface ImageGalleryProps {
  images: string[];
  displayMode?: DisplayMode;
  alt?: string;
}

function resolveUrl(src: string): string {
  if (!src) return '';
  return src.startsWith('/') || src.startsWith('http') ? src : `/images/${src}`;
}

function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
  alt,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  alt: string;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowRight') onNavigate((index - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [index, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-3xl hover:text-neutral-300 z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white hover:shadow-md z-10"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            aria-label="Next image"
          >
            &#8249;
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white hover:shadow-md z-10"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            &#8250;
          </button>
        </>
      )}

      {/* Main image */}
      <div
        className="relative"
        style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={resolveUrl(images[index])}
          alt={`${alt} ${index + 1}`}
          width={1200}
          height={900}
          className="object-contain max-h-[90vh] w-auto"
          style={{ maxWidth: '90vw' }}
        />
      </div>
    </div>
  );
}

function ImageGrid({ images, alt, onImageClick }: { images: string[]; alt: string; onImageClick: (index: number) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
          onClick={() => onImageClick(i)}
        >
          <Image
            src={resolveUrl(img)}
            alt={`${alt} ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}

function ImageCarousel({ images, alt, onImageClick }: { images: string[]; alt: string; onImageClick: (index: number) => void }) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % images.length) + images.length) % images.length);
  }, [images.length]);

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-xl bg-neutral-100 cursor-pointer"
        style={{ height: 'clamp(250px, 50vw, 500px)' }}
        onClick={() => onImageClick(current)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image gallery"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-400 ease-in-out"
            style={{ opacity: i === current ? 1 : 0 }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
          >
            <Image
              src={resolveUrl(img)}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 800px"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white hover:shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                goTo(current + 1);
              }}
              aria-label="Next image"
            >
              &#8249;
            </button>
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white hover:shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                goTo(current - 1);
              }}
              aria-label="Previous image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? 'bg-[#3B7ABD]' : 'bg-neutral-300 hover:bg-[#7AADE0]'
              }`}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip (hidden on mobile) */}
      {images.length > 1 && (
        <div className="hidden sm:flex gap-2 mt-3 overflow-x-auto justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              className={`w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 transition-all ${
                i === current
                  ? 'border-2 border-[#3B7ABD] opacity-100'
                  : 'border-2 border-transparent opacity-70 hover:opacity-100'
              }`}
              onClick={() => goTo(i)}
            >
              <Image
                src={resolveUrl(img)}
                alt={`Thumbnail ${i + 1}`}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ImageGallery({ images, displayMode = 'grid', alt = '' }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  // Single image: render inline, same as before
  if (images.length === 1) {
    return (
      <>
        <div
          className="flex justify-center cursor-pointer"
          onClick={() => setLightboxIndex(0)}
        >
          <div className="relative overflow-hidden rounded-xl shadow-md">
            <Image
              src={resolveUrl(images[0])}
              alt={alt}
              width={300}
              height={400}
              className="object-cover"
            />
          </div>
        </div>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
            alt={alt}
          />
        )}
      </>
    );
  }

  return (
    <>
      {displayMode === 'carousel' ? (
        <ImageCarousel
          images={images}
          alt={alt}
          onImageClick={(i) => setLightboxIndex(i)}
        />
      ) : (
        <ImageGrid
          images={images}
          alt={alt}
          onImageClick={(i) => setLightboxIndex(i)}
        />
      )}

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          alt={alt}
        />
      )}
    </>
  );
}
