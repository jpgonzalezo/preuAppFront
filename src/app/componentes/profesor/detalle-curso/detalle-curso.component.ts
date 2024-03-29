import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Alerta } from 'src/app/modelos/alerta.model';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Curso } from 'src/app/modelos/curso.model';
import { environment } from 'src/environments/environment';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import Swal from 'sweetalert2';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { SingleDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit {
  public colorsPolarArea: Color[] = [
    {
      backgroundColor: ['#11cdef', '#fb6340', '#f5365c', '#8965e0', '#ffd600'],
    }
  ];
  public colors: Color[] = [
    { backgroundColor: '#11cdef' },
    { backgroundColor: '#fb6340' },
    { backgroundColor: '#f5365c' }
  ]
  id_curso:string;
  alumnos: Alumno[];
  curso: Curso;
  pageAlumno: number;
  pageSizeAlumno: number;
  collectionSizeAlumno: number;
  pageAsistencia: number;
  pageSizeAsistencia: number;
  collectionSizeAsistencia: number;
  pageAlerta: number;
  pageSizeAlerta: number;
  collectionSizeAlerta: number;
  pageAsignatura: number;
  pageSizeAsignatura: number;
  collectionSizeAsignatura: number;
  alertas: Alerta[];
  asistencias: Asistencia[]
  asignaturas: Asignatura[]
  activoGrafico: boolean;
  loadCurso:boolean = true
  loadAlumnosCurso:boolean = true
  loadAsistenciaCurso:boolean = true
  loadAlertasCurso: boolean = true
  // PolarArea
  public polarAreaChartLabels: Label[];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [{ data:[], label: '' }];
  public barChartOptionsAsignatura: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsAsignatura: Label[] = [];
  public barChartTypeAsignatura: ChartType = 'bar';
  public barChartLegendAsignatura = true;
  public barChartPluginsAsignatura = [pluginDataLabels];
  public barChartDataAsignatura: ChartDataSets[] = [{ data:[], label: '' }];
  token: string
  constructor(
    private _activatedRoute:ActivatedRoute, 
    private _alumnoService:AlumnoService,
    private _cursoService:CursoService,
    private _asistenciaService: AsistenciaService,
    private _alertaService: AlertaService,
    private _asignaturaService: AsignaturaService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _router: Router
  ) {
    this.pageAlumno = 1;
    this.pageSizeAlumno = 10;
    this.pageAsistencia = 1;
    this.pageSizeAsistencia = 10;
    this.pageAlerta = 1;
    this.pageSizeAlerta = 10;
    this.pageAsignatura = 1;
    this.pageSizeAsignatura = 5;
    this.alumnos = [];
    this.asistencias = [];
    this.alertas = [];
    this.asignaturas = [];
    this.curso = new Curso();
    this.barChartLabels = []
    this.polarAreaChartLabels = []
    this.activoGrafico = false;
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_curso=this._activatedRoute.snapshot.paramMap.get('id');
    this.getCurso();
    this.getAlumnosCurso();
    this.getAsistenciaCurso();
    this.getAlertasCurso();
  }

  getCurso(){
    this.loadCurso = true
    this._cursoService.getCurso(this.id_curso,this.token).subscribe((data:Curso)=>{
      this.curso = data;
      this.asignaturas = data.asignaturas
      this.collectionSizeAsignatura = data.asignaturas.length
      this.loadCurso = false
    })
    this.loadCurso = true
    this._cursoService.getGraficoAsistencia(this.id_curso,this.token).subscribe((data:any)=>{
      this.barChartLabels = data['labels']
      this.barChartData = data['data']
    })
    this.loadCurso = true
    this._cursoService.getGraficoAsistenciaAsignatura(this.id_curso,this.token).subscribe((data:any)=>{
      this.barChartLabelsAsignatura = data['labels']
      this.barChartDataAsignatura = data['data']
      this.loadCurso = false
    })
    this.loadCurso = true
    this._cursoService.getGraficoAsignaturas(this.id_curso,this.token).subscribe((data:any)=>{
      this.polarAreaChartData = data['data']
      this.polarAreaChartLabels = data['labels']
      console.log("polarAreaChartData: ", this.polarAreaChartData);
      console.log("polarAreaChartLabels: ", this.polarAreaChartLabels);
      this.loadCurso = false
    })
    this.activoGrafico = true
  }

  getAlumnosCurso(){
    this.loadAlumnosCurso = true
    this._alumnoService.getAlumnosCurso(this.id_curso,this.token).subscribe((data:Alumno[])=>{
      this.alumnos = data
      this.collectionSizeAlumno = this.alumnos.length;
      for(let alumno of this.alumnos){
        alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
      }
      this.loadAlumnosCurso = false
    })   
  }

  getAsistenciaCurso(){
    this.loadAsistenciaCurso = true
    this._asistenciaService.getAsistenciasCurso(this.id_curso,this.token).subscribe((data:Asistencia[])=>{
      this.asistencias = data;
      this.collectionSizeAsistencia = this.asistencias.length
      this.loadAsistenciaCurso = false
    })
  }

  generarVistaHojaVida(id:string){
    this._router.navigateByUrl('/profesor/detalle/alumno/'+id);
  }

  getAlertasCurso(){
    this.loadAlertasCurso = true
    this._alertaService.getAlertasCurso(this.id_curso,this.token).subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
      this.loadAlertasCurso = false
    })
  }

  volver(){
    this._router.navigateByUrl('/profesor/cursos');
  }
  get alumnos_tabla(): Alumno[] {
    return this.alumnos
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumno - 1) * this.pageSizeAlumno, (this.pageAlumno - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
  }

  get asistencias_tabla(): Asistencia[] {
    return this.asistencias
      .map((asistencia, i) => ({id: i + 1, ...asistencia}))
      .slice((this.pageAsistencia - 1) * this.pageSizeAsistencia, (this.pageAsistencia - 1) * this.pageSizeAsistencia + this.pageSizeAsistencia);
  }

  get alertas_tabla(): Alerta[] {
    return this.alertas
      .map((alerta, i) => ({id: i + 1, ...alerta}))
      .slice((this.pageAlerta - 1) * this.pageSizeAlerta, (this.pageAlerta - 1) * this.pageSizeAlerta + this.pageSizeAlerta);
  }

  get asignaturas_tabla(): Asignatura[] {
    return this.asignaturas
      .map((asignatura, i) => ({id: i + 1, ...asignatura}))
      .slice((this.pageAsignatura - 1) * this.pageSizeAsignatura, (this.pageAsignatura - 1) * this.pageSizeAsignatura + this.pageSizeAsignatura);
  }

}
