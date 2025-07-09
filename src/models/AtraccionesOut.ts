import { RespuestaBase } from "./RespuestaBase";

export interface RespuestaAtracciones extends RespuestaBase{
    detalle: Provincia[];

}



export interface Atraccion{
    id: number,
    nombre: string
}

export interface Provincia {
    idProvincia: string;
    nombreProvincia: string;
    atracciones: Atraccion[]

}