import { RespuestaBase } from "./RespuestaBase";

export interface ReporteUsuariosOut extends RespuestaBase{
    detalle: UsuarioOut[];
}

export interface UsuarioOut{

    nombre:string;
    correo: string;
    rol: number;
    telefono: string;
}