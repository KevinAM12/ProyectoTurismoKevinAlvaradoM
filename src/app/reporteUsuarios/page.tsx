'use client'
import MenuComponent from "@/components/MenuComponent";
import { ReporteUsuariosOut, UsuarioOut } from "@/models/ReporteUsuariosOut";
import axios from "axios";
import VentanaMensajeComponent from "@/components/VentanaMensajeComponent";
import React, { useEffect, useMemo, useState } from "react";

const ReporteUsuarios: React.FC = () => {
  const [filtro, setFiltro] = useState<string>("");
  const [usuarios, setUsuarios] = useState<UsuarioOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mensajeModal, setMensajeModal] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get<ReporteUsuariosOut>(
          "https://kevinturismo-vlabk-bk-37f306f7255f.herokuapp.com/api/route/Obtener_Usuarios"
        );

        if (respuesta.data.codigoRespuesta === 0) {
          setUsuarios(respuesta.data.detalle);
        } else {
          setMensajeModal("Error al obtener usuarios: " + respuesta.data.detalleRespuesta);
          setMostrarModal(true);
        }
      } catch (error) {
        setMensajeModal("Error al conectar con el servidor.");
        setMostrarModal(true);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  const usuarioFiltrados = useMemo(() => {
    return usuarios.filter(
      (usuario) =>
        usuario.nombre.toUpperCase().includes(filtro.toUpperCase()) ||
        usuario.correo.toUpperCase().includes(filtro.toUpperCase()) ||
        usuario.telefono.toUpperCase().includes(filtro.toUpperCase()) ||
        ObtenerNombreRol(usuario.rol).toUpperCase().includes(filtro.toUpperCase())
    );
  }, [filtro, usuarios]);

  function ObtenerNombreRol(rol: number) {
    switch (Number(rol)) {
      case 1:
        return "Administrador";
      case 2:
        return "Digitador";
      case 3:
        return "Usuario";
      default:
        return "Desconocido";
    }
  }

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div>
      <MenuComponent />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Buscar por nombre, correo, teléfono o rol"
          className="mb-4 w-full max-w-md border border-gray-300 rounded px-3 py-2"
          aria-label="Filtro de usuarios"
        />
        {loading ? (
          <p className="text-center py-6 text-gray-600">Cargando usuarios...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table
              className="min-w-full divide-y divide-gray-200 bg-white"
              aria-label="Reporte de usuarios"
            >
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Correo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rol</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Teléfono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {usuarioFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                ) : (
                  usuarioFiltrados.map((usu, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.correo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{ObtenerNombreRol(usu.rol)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{usu.telefono}</td>
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

export default ReporteUsuarios;