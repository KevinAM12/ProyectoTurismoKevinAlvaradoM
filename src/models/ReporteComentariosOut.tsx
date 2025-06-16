import { RespuestaBase } from "./RespuestaBase";

export interface ReporteComentariosOut extends RespuestaBase{
    detalle: ComentarioOut[];
}

export interface ComentarioOut{
    nombre: string;
    apellido: string;
    provincia: string;
    atraccion: string;
    modalidad: string;
    comentario:string;
}