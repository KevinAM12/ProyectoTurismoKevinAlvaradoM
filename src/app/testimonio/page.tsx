import React from "react";
import TestimonioComponent from "../../components/TestimonioComponent";
import MenuComponent from "@/components/MenuComponent";

const TestimonioPage : React.FC = () => {

    const vectorTestimonios = [

        {
            nombre:"Carlos",
            comentario:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            imagen: "/Testimonio1.jpg"
        },

        {
            nombre:"Lucía",
            comentario:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            imagen: "/Testimonio2.jpg"
        },
        {
            nombre:"Andrea",
            comentario:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            imagen: "/Testimonio3.jpg"
        }
    ]
    
    return (
                <div>
                    <MenuComponent></MenuComponent>
                    {
                        vectorTestimonios.map((persona, index) => (
                            <TestimonioComponent key={index}
                            nombre = {persona.nombre}
                            comentario={persona.comentario}
                            imagen={persona.imagen}>
                            </TestimonioComponent>
                        ))
                    }
                </div>
            )

}

export default TestimonioPage;