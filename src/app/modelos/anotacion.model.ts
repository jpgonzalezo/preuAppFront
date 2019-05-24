import { Profesor } from 'src/app/modelos/profesor';
import { Alumno } from 'src/app/modelos/alumno.model';
export class Anotacion{
    id: string
    titulo:string
    fecha: string
    profesor: Profesor
    alumno: Alumno
    contenido: string
}