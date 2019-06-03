import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Topico } from 'src/app/modelos/topico.model';
import { Pregunta } from 'src/app/modelos/pregunta.model';
export class Prueba{
  id: string
  nombre: string
  cantidad_preguntas: number
  asignatura: Asignatura
  fecha: string
  tipo: string
  topicos: Topico[]
  preguntas: Pregunta[]
}