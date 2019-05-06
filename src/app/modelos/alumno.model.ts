import { Direccion } from 'src/app/modelos/direccion.model';
import { Colegio } from 'src/app/modelos/colegio.model';
import { Curso } from 'src/app/modelos/curso.model';
export class Alumno{
  id: string
  nombres: string
  apellido_paterno: string
  apellido_materno: string
  email: string
  telefono: string
  nombre_usuario: string
  password: string
  colegio: Colegio
  direccion: Direccion
  sexo: string
  puntaje_ingreso: number
  curso: Curso
  rut: string
  imagen: string
}