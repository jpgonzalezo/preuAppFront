import { Asistencia } from 'src/app/modelos/asistencia.model';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Prueba } from 'src/app/modelos/prueba.model';
import { Respuesta } from 'src/app/modelos/respuesta.model';
export class Evaluacion{
    id: string
    alumno: Alumno
    prueba: Prueba
    cantidad_buenas: number
    cantidad_malas: number
    cantidad_omitidas: number
    puntaje: number
    fecha: string
    respuestas: Respuesta []
}
