import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import {Alumno} from '../../../modelos/alumno.model';
import {ALUMNO_DATA} from '../../../modelos/alumno.model';
import {Profesor} from '../../../modelos/profesor';
import {PROFESOR_DATA} from '../../../modelos/profesor';
import {Apoderado} from '../../../modelos/apoderado';
import {APODERADO_DATA} from '../../../modelos/apoderado';
import {AlumnoService} from '../../../servicios/alumno.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})

export class PerfilesComponent implements OnInit {
  page: number;
  pageSizeAlumno: number;
  collectionSizeAlumno: number;
  pageSizeProfesor: number;
  collectionSizeProfesor: number;
  alumnos:any=[]
  profesores:any=[]

  @Output()
  nuevo_perfil = new EventEmitter<any>()

  constructor(private _alumnoService: AlumnoService, private formBuilder: FormBuilder) { 
    this.page = 1;
    this.pageSizeAlumno = 4;
    this.pageSizeProfesor = 4;
  }

  ngOnInit() {
    this.getAlumnos();
  }

  get alumnos_tabla(): any[] {
    return this.alumnos
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.page - 1) * this.pageSizeAlumno, (this.page - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
  }

  public getAlumnos(){
  	this._alumnoService.getAlumno().subscribe((data: Array<any>) => {
      this.alumnos = data;
      this.collectionSizeAlumno = this.alumnos.length;
    });
  }

  public generarVistaNuevoPerfil(tipo_perfil:string){
    this.nuevo_perfil.emit({vista : "nuevo_perfil", tipo : tipo_perfil})
  }

}
