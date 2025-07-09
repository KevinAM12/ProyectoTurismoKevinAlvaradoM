import React from "react";

interface VentanaMensajeProps{
    mostrar: boolean;
    mensaje: string;
    onClose: () => void;
}

const VentanaMensajeComponent : React.FC <VentanaMensajeProps> = ({mostrar, mensaje, onClose}) => {
    if(!mostrar) return null;
    
    return (
                    
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm dark:bg-gray-800">
                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Mensaje informativo</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{mensaje}</p>
                    <button
                    onClick={onClose}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >Cerrar</button>
                </div>
            </div>
            );

}

export default VentanaMensajeComponent;