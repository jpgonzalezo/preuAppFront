import {Alumno} from 'src/app/modelos/alumno.model';
export interface Apoderado{
    id: string,
    nombres: string,
    apellido_paterno:string,
    apellido_materno: string,
    email: string,
    telefono:string,
    direccion: string,
    rut: string,
    alumno: Alumno,
    imagen: string
}