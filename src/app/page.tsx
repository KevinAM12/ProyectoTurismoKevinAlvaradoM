'use client'
import React from "react";
import MenuComponent from "@/components/MenuComponent";
import Carousel from "@/components/Carousel";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <MenuComponent />

      <main className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-extrabold">Bienvenido a CR Turismo</h1>
        <p className="max-w-xl text-lg">
          Descubre las mejores atracciones turísticas, testimonios reales y contacta con nosotros para planificar tu viaje.
        </p>

        <Carousel />

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <a
            href="/testimonio"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Ver Testimonios
          </a>
          <a
            href="/contacto"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Contacto
          </a>
          <a
            href="/login"
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
          >
            Iniciar Sesión
          </a>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
