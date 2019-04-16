import { Direccion } from 'src/app/modelos/direccion.model';
import { Asignatura } from 'src/app/modelos/asignatura.model';
export interface Profesor{
  id: string,
  apellido_paterno: string,
  nombres: string,
  password: string,
  direccion: Direccion,
  rut: string,
  email: string,
  telefono: string,
  apellido_materno: string,
  asignatura: Asignatura,
  imagen: string
}