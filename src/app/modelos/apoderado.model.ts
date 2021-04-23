import {Alumno} from 'src/app/modelos/alumno.model';
import {Direccion} from 'src/app/modelos/direccion.model';
export class Apoderado{
    id: string
    nombres: string
    apellido_paterno:string
    apellido_materno: string
    email: string
    telefono:string
    direccion: Direccion
    rut: string
    alumno: Alumno
    imagen: string
}