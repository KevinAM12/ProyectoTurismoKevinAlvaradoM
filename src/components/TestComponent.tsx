import React, { useEffect, useState } from "react";

const TestComponent : React.FC = () =>{
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [respuesta, setRespuesta] = useState<string>("");
    const [esHumano, setEsHumano] = useState<boolean>(false);

    useEffect(()=>{
        generarPregunta();
    }, [])

    const generarPregunta = () =>{

        const a = Math.floor(Math.random()* 10) +1;
        const b = Math.floor(Math.random()* 10) +1;

        setNum1(a);
        setNum2(b);
        setRespuesta("");
        setEsHumano(false);
    }

    const verificarRespuesta = () => {
        const respuestaNumero = parseInt(respuesta,10);

        if(!isNaN(respuestaNumero) && respuestaNumero === num1 + num2){
            setEsHumano(true)
        }else{
            generarPregunta();
        }

    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-4">Verificación de humanidad</h1>
                {
                    !esHumano ? (
                        <div>
                            <p className="mb-2">
                                ¿Cuánto es <strong>{num1} +  {num2}</strong>?
                            </p>
                            <input
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)}
                                placeholder="Tu respuesta es: ">
                            </input>
                            <button
                                onClick={verificarRespuesta}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >Verificar</button>
                        </div>
                    ) :
                    (
                        <div className="text-green-600 font-semibold">Eres humano, adelante</div>
                    )

                }
            </div>

        </div>
    )

}

export default TestComponent;