import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Curso } from 'src/app/modelos/curso.model';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Justificacion } from 'src/app/modelos/justificacion.model';
import { Config } from 'src/app/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.component.html',
  styleUrls: ['./detalle-asistencia.component.css']
})
export class DetalleAsistenciaComponent implements OnInit {
  id_asistencia:string;
  asistencia: Asistencia;
  asignatura: Asignatura;
  curso: Curso;
  pageSizePresentes: number;
  pagePresentes: number;
  collectionSizePresentes: number;
  pageSizeAusentes: number;
  pageAusentes: number;
  collectionSizeAusentes: number;
  pageSizeJustificacion: number;
  pageJustificacion: number;
  collectionSizeJustificacion: number;
  justificaciones: Justificacion[]
  alumnosPresentes: Alumno[]
  alumnosAusentes: Alumno[]
  constructor(private _router:Router,private _asistenciaService: AsistenciaService, private _activatedRoute: ActivatedRoute)
  { 
    this.asistencia = new Asistencia();
    this.curso = new Curso();
    this.asignatura = new Asignatura();
    this.pagePresentes = 1;
    this.pageSizePresentes = 10;
    this.pageAusentes = 1;
    this.pageSizeAusentes = 10;
    this.pageJustificacion = 1;
    this.pageSizeJustificacion = 2;
    this.alumnosPresentes = []
    this.alumnosAusentes = []
    this.justificaciones = []
  }

  ngOnInit() {
    this.id_asistencia = this._activatedRoute.snapshot.paramMap.get('id');
    this.getAsistencia();
    this.getJustificaciones()
  }

  getAsistencia(){
    this._asistenciaService.getAsistencia(this.id_asistencia).subscribe((data:Asistencia)=>{
      this.asistencia = data;
      for(let alumno of this.asistencia.alumnos_presentes){
        alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
      }
      for(let alumno of this.asistencia.alumnos_ausentes){
        alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
      }
      this.collectionSizePresentes = this.asistencia.alumnos_presentes.length;
      this.collectionSizeAusentes = this.asistencia.alumnos_ausentes.length;
      this.curso = this.asistencia.curso;
      this.alumnosPresentes = this.asistencia.alumnos_presentes
      this.alumnosAusentes = this.asistencia.alumnos_ausentes
      this.asignatura = this.asistencia.asignatura;
    })
  }

  getJustificaciones(){
    this._asistenciaService.getJustificacionesAsistencia(this.id_asistencia).subscribe((data:Justificacion[])=>{
      this.justificaciones = data
      this.collectionSizeJustificacion = this.justificaciones.length
    })
  }

  volver(){
    this._router.navigateByUrl('/admin/asistencia');
  }

  generarJustificacion(id_alumno:string){
    Swal.fire({
      title: 'Nueva Justificación',
      text: 'Ingrese la causal de la inasistencia del alumno',
      input: 'textarea',
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result)=>{
      if(result.dismiss == null){
        this._asistenciaService.postJustificacion({'id_alumno':id_alumno,'id_asistencia':this.id_asistencia,'causa':result.value}).subscribe((data:any)=>{
          if(data['Response']=="exito"){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha creado la asignatura exitosamente',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            }).then((result)=>{
              this.getJustificaciones()
            })
          }
        })
      }
    })
  }

  get alumnos_presentes_tabla(): Alumno[] {
    return this.alumnosPresentes
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pagePresentes - 1) * this.pageSizePresentes, (this.pagePresentes - 1) * this.pageSizePresentes + this.pageSizePresentes);
  }

  get alumnos_ausentes_tabla(): Alumno[] {
    return this.alumnosAusentes
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAusentes - 1) * this.pageSizeAusentes, (this.pageAusentes - 1) * this.pageSizeAusentes + this.pageSizeAusentes);
  }

  get justificaciones_tabla(): Justificacion[] {
    return this.justificaciones
      .map((justificacion, i) => ({id: i + 1, ...justificacion}))
      .slice((this.pageJustificacion - 1) * this.pageSizeJustificacion, (this.pageJustificacion - 1) * this.pageSizeJustificacion + this.pageSizeJustificacion);
  }
}
