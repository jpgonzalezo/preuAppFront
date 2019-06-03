import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Topico } from 'src/app/modelos/topico.model';
export class Pregunta{
  numero_pregunta: number
  topico: Topico
  alternativa: string
}