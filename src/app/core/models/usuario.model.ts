import { Rol } from './rol.model';

export interface RegistarUsuario {
    clave: string;
    email: string;
    usuario: string;
    nombres: string;
    apellidos: string;
}

export interface Usuario {
    idUsuario?: number;
    usuario: string;
    nombres: string;
    apellidos: string;
    email: string;
    clave: string;
    estado: boolean;
    snNoBloqueado?: boolean;
    fechaCreacion: string;
    fechaUltimoIngreso?: string;
    fechaUltimoIngresoVisualizacion?: string;
    imagenPerfilUrl?: string;
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
