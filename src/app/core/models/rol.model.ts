import { Autorizacion } from './autorizacion.model';

export interface Rol {
    idRol ?: number;
    descripcion: string;
    autorizaciones: [Autorizacion];
}
