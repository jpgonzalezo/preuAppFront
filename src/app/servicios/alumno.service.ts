import { Injectable } from '@angular/core';
import {ALUMNOS} from '../componentes/admin/lista-alumnos/alumnos.json';
import {Alumno} from '../modelos/alumno';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor() { }

  getAlumnos():Alumno[]{
    return ALUMNOS;
  }
}
