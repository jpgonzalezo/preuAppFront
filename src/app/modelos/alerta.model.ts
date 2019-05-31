import { Alumno } from 'src/app/modelos/alumno.model';
import { Asignatura } from 'src/app/modelos/asignatura.model';
export class Alerta{
    id: string
    alumno:Alumno
    data: string
    fecha: string
    asignatura: Asignatura
}