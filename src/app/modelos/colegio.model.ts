import { Direccion } from 'src/app/modelos/direccion.model';

export interface Colegio{
    id: string,
    nombre: string,
    direccion: Direccion,
    cantidad_estudiantes: number
}