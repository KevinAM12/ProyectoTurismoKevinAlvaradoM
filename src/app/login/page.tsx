"use client"
import { LoginIn } from "@/models/LoginIn";
import { LoginOut } from "@/models/LoginOut";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import VentanaMensajeComponent from "@/components/VentanaMensajeComponent";
import TestComponent from "@/components/TestComponent";

const LoginPage: React.FC = () => {

    const [correo, setCorreo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);

    const {login} = useAuth();
    const router = useRouter();

    async function ValidarCredenciales() {

        try
        {
          const respuestaLogin = await login (correo, password);
          
          if(respuestaLogin)
          {
            router.push("/reporteComentarios");
          }
          else
          {
            setMostrarModal(true);
          }
        }

        catch (error){
                console.log("Hay un error en el consumo del api", error);
        }
    }

    const cerrarModal = () => {
        setMostrarModal(false);
    }


    {/*Login la pantalla*/ }
    return (
        <div>
            <TestComponent></TestComponent>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">Bienvenidos a CR Turismo</h1>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digite su correo:</label>
                            <input
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="correo@gmail.com" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Digite su contraseña:</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="********" />
                        </div>
                        <button
                            onClick={ValidarCredenciales}
                            className="bg-blue-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirma credenciales</button>
                    </div>
                </div>
            </div>


            {
                mostrarModal && (
                    <VentanaMensajeComponent
                        mostrar = {mostrarModal}
                        mensaje = "Credenciales incorrectas"
                        onClose = {cerrarModal}>
                    </VentanaMensajeComponent>
                )
            }
        </div>)

}

export default LoginPage;