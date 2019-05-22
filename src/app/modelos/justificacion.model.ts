import { Asistencia } from 'src/app/modelos/asistencia.model';
import { Alumno } from 'src/app/modelos/alumno.model';
export class Justificacion{
    id: string
    fecha: string
    asistencia: Asistencia
    alumno: Alumno
    causa: string
}