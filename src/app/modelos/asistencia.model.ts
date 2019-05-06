import { Curso } from './curso.model';
import { Asignatura } from './asignatura.model';
import { Alumno } from './alumno.model';
export class Asistencia{
    id: number
    fecha : string
    curso : Curso
    asignatura : Asignatura
    alumnos_presentes : Alumno[]
    alumnos_ausentes : Alumno[]
}