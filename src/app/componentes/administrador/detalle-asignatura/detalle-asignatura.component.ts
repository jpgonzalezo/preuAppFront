import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Profesor } from 'src/app/modelos/profesor';
import { Prueba } from 'src/app/modelos/prueba.model';
import { Alerta } from 'src/app/modelos/alerta.model';
import { Topico } from 'src/app/modelos/topico.model';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { AsistenciaService  } from 'src/app/servicios/asistencia.service';
import { PruebaService } from 'src/app/servicios/prueba.service';
import { AlertaService} from 'src/app/servicios/alerta.service';
import { TopicoService } from 'src/app/servicios/topico.service';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent implements OnInit {
  asignatura: Asignatura;
  profesores: Profesor[]
  asistencias: Asistencia[]
  pruebas: Prueba[]
  alertas: Alerta[]
  topicos: Topico[]
  id_asignatura: string;
  pageProfesor: number;
  pageSizeProfesor: number;
  collectionSizeProfesor: number;
  pageAsistencia: number;
  pageSizeAsistencia: number;
  collectionSizeAsistencia: number;
  pageEvaluacion: number;
  pageSizeEvaluacion: number;
  collectionSizeEvaluacion: number;
  pageAlerta: number;
  pageSizeAlerta: number;
  collectionSizeAlerta: number;
  constructor(private _asignaturaService: AsignaturaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _profesorService: ProfesorService,
    private _asistenciaService: AsistenciaService,
    private _pruebaService: PruebaService,
    private _alertaService: AlertaService,
    private _topicoService: TopicoService
    ) {
    this.asignatura = new Asignatura();
    this.profesores = [];
    this.pruebas = [];
    this.asistencias = [];
    this.pruebas = [];
    this.alertas = [];
    this.topicos = [];
    this.pageProfesor = 1;
    this.pageSizeProfesor = 5;
    this.pageAsistencia = 1;
    this.pageSizeAsistencia = 10;
    this.pageEvaluacion = 1;
    this.pageSizeEvaluacion = 10;
    this.pageAlerta = 1;
    this.pageSizeAlerta = 10;
   }

  ngOnInit() {
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.getProfesoresAsignatura()
    this.getAsignatura()
    this.getAsistenciasAsignatura()
    this.getPruebasAsignatura()
    this.getAlertasAsignatura()
    this.getTopicosAsignatura()
  }

  get profesores_tabla(): Profesor[] {
    return this.profesores
    .map((profesor, i) => ({id: i + 1, ...profesor}))
    .slice((this.pageProfesor - 1) * this.pageSizeProfesor, (this.pageProfesor - 1) * this.pageSizeProfesor + this.pageSizeProfesor);
  }

  get asistencias_tabla(): Asistencia[]{
    return this.asistencias
    .map((asistencia, i) => ({id: i + 1, ...asistencia}))
    .slice((this.pageAsistencia - 1) * this.pageSizeAsistencia, (this.pageAsistencia - 1) * this.pageSizeAsistencia + this.pageSizeAsistencia);
  }

  get evaluaciones_tabla(): Prueba[]{
    return this.pruebas
    .map((evaluacion, i) => ({id: i + 1, ...evaluacion}))
    .slice((this.pageEvaluacion - 1) * this.pageSizeEvaluacion, (this.pageEvaluacion - 1) * this.pageSizeEvaluacion + this.pageSizeEvaluacion);
  }

  get alertas_tabla(): Alerta[]{
    return this.alertas
    .map((alerta, i) => ({id: i + 1, ...alerta}))
    .slice((this.pageAlerta - 1) * this.pageSizeAlerta, (this.pageAlerta - 1) * this.pageSizeAlerta + this.pageSizeAlerta);
  }

  getProfesoresAsignatura(){
    this._profesorService.getProfesoresAsignatura(this.id_asignatura).subscribe((data:Profesor[])=>{
      this.profesores = data
      this.collectionSizeProfesor = this.profesores.length;
      for(let alumno of this.profesores){
        alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
      }
    })   
  }

  getAsignatura(){
    this._asignaturaService.getAsignatura(this.id_asignatura).subscribe((data:Asignatura)=>{
      this.asignatura = data;
    })
  }

  getAsistenciasAsignatura(){
    this._asistenciaService.getAsistenciasAsignatura(this.id_asignatura).subscribe((data:Asistencia[])=>{
      this.asistencias = data
      this.collectionSizeAsistencia = this.asistencias.length
    })
  }

  getPruebasAsignatura(){
    this._pruebaService.getPruebasAsignaturas(this.id_asignatura).subscribe((data:Prueba[])=>{
      this.pruebas = data
      this.collectionSizeEvaluacion = this.pruebas.length
    })
  }

  getAlertasAsignatura(){
    this._alertaService.getAlertasAsignatura(this.id_asignatura).subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
    })
  }

  getTopicosAsignatura(){
    this._topicoService.getTopicosAsignatura(this.id_asignatura).subscribe((data:Topico[])=>{
      this.topicos = data;
      console.log(data)
    })
  }

  volver(){
    this._router.navigateByUrl('/admin/asignaturas');
  }
}
