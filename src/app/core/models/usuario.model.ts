import { Rol } from './rol.model';

export interface RegistarUsuario {
    clave: string;
    email: string;
    usuario: string;
}

export interface Usuario {
    idUsuario?: number;
    usuario: string;
    email: string;
    clave: string;
    estado: boolean;
    fechaCreacion: string;
    roles: [Rol];
}
