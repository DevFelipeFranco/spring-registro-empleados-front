import { Usuario } from './usuario.model';
import { TipoDocumento } from './tipoDocumento.model';

export interface Persona {
    idPersona?: number;
    email: string;
    direccion: string;
    edad: number;
    fechaNacimiento: Date;
    identificacion: number;
    primerApellido: string;
    primerNombre: string;
    segundoApellido: string;
    segundoNombre: string;
    tipoDocumento: TipoDocumento;
    usuario: Usuario;
}
