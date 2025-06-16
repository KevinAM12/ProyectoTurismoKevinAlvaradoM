import { RespuestaBase } from "./RespuestaBase"

export interface LoginOut extends RespuestaBase {
    detalle:{
        rol: number,
        correo: string
    }
}