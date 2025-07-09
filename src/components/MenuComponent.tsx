'use client'
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const MenuComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const { logout, estaAutenticado } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Mi sitio turístico
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
            {/* Icono hamburguesa */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <li>
            <Link href="/testimonio">Testimonios</Link>
          </li>
          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
          <li className="relative group">
            <button type="button">Reportes</button>
            <ul className="absolute hidden group-hover:block bg-white border shadow-md py-2 rounded z-10">
              <li className="block px-4 py-2 hover:bg-gray-100">
                <Link href="/reporteUsuarios">Usuarios</Link>
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100">
                <Link href="/reporteComentarios">Comentarios</Link>
              </li>
            </ul>
          </li>
          {estaAutenticado && (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Salir
              </button>
            </li>
          )}
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium">
          <li>
            <Link href="/testimonio">Testimonios</Link>
          </li>
          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
          <li>
            <button
              className="w-full text-left"
              onClick={() => setIsReportOpen(!isReportOpen)}
            >
              Reportes {isReportOpen ? "▲" : "▼"}
            </button>
            {isReportOpen && (
              <ul className="pl-4 mt-1 space-y-1">
                <li>
                  <Link href="/reporteUsuarios">Usuarios</Link>
                </li>
                <li>
                  <Link href="/reporteComentarios">Comentarios</Link>
                </li>
              </ul>
            )}
          </li>
          {estaAutenticado && (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold w-full text-left"
              >
                Salir
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default MenuComponent;