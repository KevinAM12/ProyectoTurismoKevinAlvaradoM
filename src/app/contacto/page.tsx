'use client'
import { Provincia, RespuestaAtracciones } from "@/models/AtraccionesOut";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const ContactoPage: React.FC = () => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<number>(0);
  const [listaAtraccionesPorProvincia, setListaAtraccionesPorProvincia] = useState<Provincia[]>([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [telefono, setTelefono] = useState("");
  const [atraccionSeleccionada, setAtraccionSeleccionada] = useState<string>("");

  const [mensajeEnviado, setMensajeEnviado] = useState<string>("");

  useEffect(() => {
    const obtenerAtracciones = async () => {
      const respuesta = await axios.get<RespuestaAtracciones>(
        "https://kevinturismo-vlabk-bk-37f306f7255f.herokuapp.com/api/route/Obtener_Las_Atracciones"
      );

      if (respuesta.data.codigoRespuesta === 0)
        setListaAtraccionesPorProvincia(respuesta.data.detalle);
    };

    obtenerAtracciones();
  }, []);

  const atraccionesDisponibles = useMemo(() => {
    const provinciaActual = listaAtraccionesPorProvincia.find(
      (provincia) => Number(provincia.idProvincia) === provinciaSeleccionada
    );

    return provinciaActual ? provinciaActual.atracciones : [];
  }, [provinciaSeleccionada]);

  const handleEnviar = async () => {
    if (!nombre || !correo || !mensaje || provinciaSeleccionada === 0 || !atraccionSeleccionada) {
      setMensajeEnviado("Por favor complete todos los campos.");
      return;
    }

    try {
      await axios.post("https://kevinturismo-vlabk-bk-37f306f7255f.herokuapp.com/api/route/Guardar_Contacto", {
        nombre,
        correo,
        telefono,
        provincia: provinciaSeleccionada,
        atraccion: atraccionSeleccionada,
        comentario: mensaje,
      });

      setMensajeEnviado("¡Mensaje enviado con éxito!");
      setNombre("");
      setCorreo("");
      setTelefono("");
      setMensaje("");
      setProvinciaSeleccionada(0);
      setAtraccionSeleccionada("");

    } catch (error) {
      setMensajeEnviado("Error al enviar el mensaje.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Formulario de Contacto</h1>

      <div className="space-y-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono (opcional)"
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="block mb-1">Provincia:</label>
          <select
            value={provinciaSeleccionada}
            onChange={(e) => setProvinciaSeleccionada(Number(e.target.value))}
            className="w-full border p-2 rounded"
          >
            <option value={0}>Seleccione una provincia</option>
            {listaAtraccionesPorProvincia.map((provincia) => (
              <option key={provincia.idProvincia} value={provincia.idProvincia}>
                {provincia.nombreProvincia}
              </option>
            ))}
          </select>
        </div>

        {provinciaSeleccionada !== 0 && (
          <div>
            <label className="block mb-1">Atracción:</label>
            <select
              value={atraccionSeleccionada}
              onChange={(e) => setAtraccionSeleccionada(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Seleccione una atracción</option>
              {atraccionesDisponibles.map((atraccion) => (
                <option key={atraccion.id} value={atraccion.nombre}>
                  {atraccion.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escriba su mensaje o comentario..."
          rows={4}
          className="w-full border p-2 rounded"
        ></textarea>

        <button
          onClick={handleEnviar}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Enviar mensaje
        </button>

        {mensajeEnviado && (
          <p className="mt-2 text-center text-sm text-green-600">{mensajeEnviado}</p>
        )}
      </div>
    </div>
  );
};

export default ContactoPage;