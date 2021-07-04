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
import { environment } from 'src/environments/environment';
import swal from'sweetalert2';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label,Color } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html'
})
export class DetalleAsignaturaComponent implements OnInit {
  public colors: Color[] = [
    { backgroundColor: '#11cdef' },
    { backgroundColor: '#fb6340' },
    { backgroundColor: '#f5365c' }
  ]
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
  pageTopico: number;
  pageSizeTopico: number;
  collectionSizeTopico: number;
  public barChartOptions: ChartOptions = {
    responsive: true,
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
  public barChartData: ChartDataSets[] = [{ data: [], label: '' }];
  public barChartOptionsAsistencia: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsAsistencia: Label[] = [];
  public barChartTypeAsistencia: ChartType = 'bar';
  public barChartLegendAsistencia = true;
  public barChartPluginsAsistencia = [pluginDataLabels];
  public barChartDataAsistencia: ChartDataSets[] = [{ data: [], label: '' }];
  token: string
  loadProfesoresAsignatura:boolean = true
  loadAsignatura:boolean = true
  loadAsistenciasAsignatura:boolean = true
  loadPruebasAsignatura:boolean = true
  loadAlertasAsignatura:boolean = true
  loadTopicosAsignatura:boolean = true
  loadGraficoRendimientoEvaluacionesAsignatura:boolean = true
  loadGraficoAsistenciaAsignatura:boolean = true
  constructor(private _asignaturaService: AsignaturaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _profesorService: ProfesorService,
    private _asistenciaService: AsistenciaService,
    private _pruebaService: PruebaService,
    private _alertaService: AlertaService,
    private _topicoService: TopicoService,
    private _localService: LocalService,
    private _storageService: StorageService
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
    this.pageTopico = 1;
    this.pageSizeTopico = 10;
   }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.getProfesoresAsignatura()
    this.getAsignatura()
    this.getAsistenciasAsignatura()
    this.getPruebasAsignatura()
    this.getAlertasAsignatura()
    this.getTopicosAsignatura()
    this.getGraficoRendimientoEvaluacionesAsignatura()
    this.getGraficoAsistenciaAsignatura()
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

  get topicos_tabla(): Topico[]{
    return this.topicos
    .map((topico, i) => ({id: i + 1, ...topico}))
    .slice((this.pageTopico - 1) * this.pageSizeTopico, (this.pageTopico - 1) * this.pageSizeTopico + this.pageSizeTopico);
  }

  getGraficoAsistenciaAsignatura(){
    this.loadGraficoAsistenciaAsignatura = true
    this._asignaturaService.getGraficoAsistenciaAsignatura(this.id_asignatura,this.token).subscribe((data:any)=>{
      this.barChartDataAsistencia = data['data']
      this.barChartLabelsAsistencia = data['labels']
      this.loadGraficoAsistenciaAsignatura = false
    })
  }
  getGraficoRendimientoEvaluacionesAsignatura(){
    this.loadGraficoRendimientoEvaluacionesAsignatura = true
    this._asignaturaService.getGraficoRendimientoEvaluacionesAsignatura(this.id_asignatura,this.token).subscribe((data:any)=>{
      this.barChartLabels = data['labels']
      this.barChartData = data['data']
      this.loadGraficoRendimientoEvaluacionesAsignatura = false
    })
  }
  getProfesoresAsignatura(){
    this.loadProfesoresAsignatura = true
    this._profesorService.getProfesoresAsignatura(this.id_asignatura,this.token).subscribe((data:Profesor[])=>{
      this.profesores = data
      this.collectionSizeProfesor = this.profesores.length;
      for(let alumno of this.profesores){
        alumno.imagen = environment.API_SERVER_URL+"/profesor_imagen/"+alumno.imagen
      }
      this.loadProfesoresAsignatura = false
    })   
  }

  getAsignatura(){
    this.loadAsignatura = true
    this._asignaturaService.getAsignatura(this.id_asignatura,this.token).subscribe((data:Asignatura)=>{
      this.asignatura = data;
      this.loadAsignatura = false
    })
  }

  getAsistenciasAsignatura(){
    this.loadAsistenciasAsignatura = true
    this._asistenciaService.getAsistenciasAsignatura(this.id_asignatura,this.token).subscribe((data:Asistencia[])=>{
      this.asistencias = data
      this.collectionSizeAsistencia = this.asistencias.length
      this.loadAsistenciasAsignatura = false
    })
  }

  getPruebasAsignatura(){
    this.loadPruebasAsignatura = true
    this._pruebaService.getPruebasAsignaturas(this.id_asignatura,this.token).subscribe((data:Prueba[])=>{
      this.pruebas = data
      this.collectionSizeEvaluacion = this.pruebas.length
      this.loadPruebasAsignatura = false
    })
  }

  getAlertasAsignatura(){
    this.loadAlertasAsignatura = true
    this._alertaService.getAlertasAsignatura(this.id_asignatura,this.token).subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
      this.loadAlertasAsignatura = false
    })
  }

  getTopicosAsignatura(){
    this.loadTopicosAsignatura = true
    this._topicoService.getTopicosAsignatura(this.id_asignatura,this.token).subscribe((data:Topico[])=>{
      this.topicos = data;
      this.collectionSizeTopico = this.topicos.length
      this.loadTopicosAsignatura = false
    })
  }

  verDetalleEvaluacion(id_evaluacion:string){
    this._router.navigateByUrl('/admin/asignaturas/detalle_asignatura/'+this.id_asignatura+'/detalle_evaluacion/'+id_evaluacion)
  }

  volver(){
    this._router.navigateByUrl('/admin/asignaturas');
  }

  deleteTopico(id:string){
    swal.fire({
      title: 'Desea borrar este Tópico?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this._topicoService.deleteTopico(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='borrado'){
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado el tópico exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getTopicosAsignatura();
            })
          }
        })
      }

    })
  }
}
