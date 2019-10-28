import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import { Respuesta } from 'src/app/modelos/respuesta.model';
import { Alumno } from 'src/app/modelos/alumno.model';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { AsistenciaService  } from 'src/app/servicios/asistencia.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Evaluacion } from 'src/app/modelos/evaluacion.model';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent implements OnInit {
  asignatura:Asignatura;
  asistencias: Asistencia[];
  talleres: Evaluacion[];
  ensayos: Evaluacion[];
  tareas: Evaluacion[];
  id_asignatura: string;
  pageTaller: number;
  pageSizeTaller: number;
  collectionSizeTaller: number;
  pageEnsayo: number;
  pageSizeEnsayo: number;
  collectionSizeEnsayo: number;
  pageTarea: number;
  pageSizeTarea: number;
  collectionSizeTarea: number;
  pageAsistencia: number;
  pageSizeAsistencia: number;
  collectionSizeAsistencia: number;
  token: string;
  loadTaller:boolean = true;
  loadEnsayo:boolean = true;
  loadTarea:boolean = true;
  loadAsistencia:boolean = true;
  constructor(
    private _asignaturaService: AsignaturaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _evaluacionService: EvaluacionService,
    private _asistenciaService: AsistenciaService,
    private _localService: LocalService,
    private _storageService: StorageService
  ) {
    this.asignatura = new Asignatura();
    this.talleres = [];
    this.ensayos = [];
    this.tareas = [];
    this.asistencias = [];
    this.pageTaller = 1;
    this.pageSizeTaller = 5;
    this.pageEnsayo = 1;
    this.pageSizeEnsayo = 5;
    this.pageTarea = 1;
    this.pageSizeTarea = 5;
    this.pageAsistencia = 1;
    this.pageSizeAsistencia = 10;
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken();
    }
    else{
      this.token = this._storageService.getCurrentToken();
    }
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.getAsignatura();
    this.getEvaluacionesAlumno();
    this.getAsistenciaAlumnoAsignatura();
  }

  getAsignatura(){
    this._asignaturaService.getAsignatura(this.id_asignatura,this.token).subscribe((data:Asignatura)=>{
      this.asignatura = data;
    })
  }

  getAsistenciaAlumnoAsignatura(){
    this.loadAsistencia = true;
    this._asistenciaService.getAsistenciaAlumnoAsignatura(this.token,this.id_asignatura).subscribe((data:any)=>{
      this.asistencias = data;
      this.collectionSizeAsistencia = data.length;
      this.loadAsistencia = false;
      console.log(data)
    })
  }

  getEvaluacionesAlumno(){
    this.loadEnsayo = true;
    this.loadTaller = true;
    this.loadTarea = true;
    this._evaluacionService.getEvaluacionesAlumno(this.token,this.id_asignatura).subscribe((data:any)=>{
      for(let evaluacion of data){
        if(evaluacion.prueba.tipo=="TALLER"){
          this.talleres.push(evaluacion)
        }
        if(evaluacion.prueba.tipo=="ENSAYO"){
          this.ensayos.push(evaluacion)
        }
        if(evaluacion.prueba.tipo=="TAREA"){
          this.tareas.push(evaluacion)
        }
      }
      this.loadEnsayo = false;
      this.loadTaller = false;
      this.loadTarea = false;
      this.collectionSizeEnsayo = this.ensayos.length;
      this.collectionSizeTaller = this.talleres.length;
      this.collectionSizeTarea = this.tareas.length;
    })
  }

  get asistencias_tabla(): Asistencia[]{
    return this.asistencias
    .map((asistencia, i) => ({id: i + 1, ...asistencia}))
    .slice((this.pageAsistencia - 1) * this.pageSizeAsistencia, (this.pageAsistencia - 1) * this.pageSizeAsistencia + this.pageSizeAsistencia);
  }

  get talleres_tabla(): Evaluacion[]{
    return this.talleres
    .map((taller, i) => ({id: i + 1, ...taller}))
    .slice((this.pageTaller - 1) * this.pageSizeTaller, (this.pageTaller - 1) * this.pageSizeTaller + this.pageSizeTaller);
  }

  get ensayos_tabla(): Evaluacion[]{
    return this.ensayos
    .map((ensayo, i) => ({id: i + 1, ...ensayo}))
    .slice((this.pageEnsayo - 1) * this.pageSizeEnsayo, (this.pageEnsayo - 1) * this.pageSizeEnsayo + this.pageSizeEnsayo);
  }

  get tareas_tabla(): Evaluacion[]{
    return this.tareas
    .map((tarea, i) => ({id: i + 1, ...tarea}))
    .slice((this.pageTarea - 1) * this.pageSizeTarea, (this.pageTarea - 1) * this.pageSizeTarea + this.pageSizeTarea);
  }

  volver(){
    this._router.navigateByUrl('/alumno/asignaturas');
  }

  verAlternativas(respuestas: Respuesta[], alumno:Alumno): void{
    let html = '';
    html += '<table class="table table-striped">';
     html += '<thead>';
       html += '<tr>';
         html += '<th scope="col">Pregunta</th>';
         html += '<th scope="col">Alternativa Seleccionada</th>';
         html += '<th scope="col">Correcta</th>';
       html += '</tr>';
     html += '</thead>';
     html += '<tbody>';
       for(var i = 0; i < respuestas.length; i++) {
          html += '<tr>';
              html += '<th scope="row">'+respuestas[i].numero_pregunta+'</th>';
              html += '<td>'+respuestas[i].alternativa+'</td>';
            if(respuestas[i].correcta) {
              html += '<td><i class="fas fa-check-circle text-success"></i></td>';
            }
            else {
              html += '<td><i class="fas fa-times text-danger"></i></td>';
            }
          html += '</tr>';
       }
     html += '</tbody>';
    html += '</table>';

    swal.fire({
      title: 'Respuestas '+alumno.nombres+" "+alumno.apellido_paterno+" "+alumno.apellido_materno,
      type: 'info',
      html: html,
      confirmButtonColor: '#2dce89',
      confirmButtonText: 'Ok'
    });
  }

}
