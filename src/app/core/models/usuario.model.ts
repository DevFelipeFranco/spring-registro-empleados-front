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
export interface Login {
    clave: string;
    email?: string;
    usuario: string;
}

export interface LoginResponse {
    tokenAutenticacion: string;
    refreshToken: string;
    expiresAt: Date;
    usuario: Usuario;
}
