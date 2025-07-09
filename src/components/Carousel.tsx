'use client'
import React, { useState, useEffect } from "react";

interface Slide {
  id: number;
  imageUrl: string;
  altText: string;
  caption?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    imageUrl: "/PlayaCR.jpg",
    altText: "Playa hermosa en Costa Rica",
    caption: "Disfruta las playas paradisíacas de Costa Rica",
  },
  {
    id: 2,
    imageUrl: "/MontañaCR.jpg",
    altText: "Montañas de Costa Rica",
    caption: "Explora las montañas y la naturaleza",
  },
  {
    id: 3,
    imageUrl: "/BosqueCR.jpg",
    altText: "Bosques tropicales",
    caption: "Sumérgete en la biodiversidad tropical",
  },
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Cambio automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`duration-700 ease-in-out ${
              index === current ? "block" : "hidden"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.altText}
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-4 text-center">
              {slide.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Botones*/}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-2"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-2"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;