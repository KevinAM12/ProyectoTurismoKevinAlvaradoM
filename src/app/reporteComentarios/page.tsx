'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ComentarioOut, ReporteComentariosOut } from "@/models/ReporteComentariosOut";
import MenuComponent from "@/components/MenuComponent";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import VentanaMensajeComponent from "@/components/VentanaMensajeComponent";


const ReporteComentarios: React.FC = () => {
  const [comentarios, setComentarios] = useState<ComentarioOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mensajeModal, setMensajeModal] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const { estaAutenticado, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!estaAutenticado) {
      setMensajeModal("Usted no está logeado en la aplicación");
      setMostrarModal(true);
      return;
    }

    if (user?.rol !== "1" && user?.rol !== "2") {
      setMensajeModal("Usted no tiene los permisos para ver esta apartado");
      setMostrarModal(true);
      return;
    }
  }, [estaAutenticado, user]);

  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get<ReporteComentariosOut>(
          "https://kevinturismo-vlabk-bk-37f306f7255f.herokuapp.com/api/route/Obtener_Comentarios"
        );

        if (respuesta.data.codigoRespuesta === 0) {
          setComentarios(respuesta.data.detalle);
        } else {
          setMensajeModal("Error al obtener comentarios: " + respuesta.data.detalleRespuesta);
          setMostrarModal(true);
        }
      } catch (error) {
        setMensajeModal("Error al conectar con el servidor.");
        setMostrarModal(true);
      } finally {
        setLoading(false);
      }
    };

    if (estaAutenticado && (user?.rol === "1" || user?.rol === "2")) {
      obtenerComentarios();
    }
  }, [estaAutenticado, user]);

  const cerrarModal = () => {
    setMostrarModal(false);
    router.push("/login");
  };

  return (
    <div>
      <MenuComponent />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center py-6 text-gray-600">Cargando comentarios...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table
              className="min-w-full divide-y divide-gray-200 bg-white"
              aria-label="Reporte de comentarios"
            >
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Provincia</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Atracción</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Modalidad</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Comentario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {comentarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No hay comentarios disponibles.
                    </td>
                  </tr>
                ) : (
                  comentarios.map((usu, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {usu.nombre} {usu.apellido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.provincia}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.atraccion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.modalidad}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.comentario}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <VentanaMensajeComponent mostrar={mostrarModal} mensaje={mensajeModal} onClose={cerrarModal} />
    </div>
  );
};

export default ReporteComentarios;