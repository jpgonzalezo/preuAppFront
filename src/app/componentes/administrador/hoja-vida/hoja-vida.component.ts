import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlumnoService } from '../../../servicios/alumno.service';
import { JustificacionService } from 'src/app/servicios/justificacion.service';
import { ObservacionService } from '../../../servicios/observacion.service';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';
import { Justificacion } from 'src/app/modelos/justificacion.model';
import { Alerta } from 'src/app/modelos/alerta.model';
import swal from'sweetalert2';
import { Config } from 'src/app/config';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label,MultiDataSet } from 'ng2-charts';
import { ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { LocalService } from 'src/app/servicios/local.service';
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html'
})
export class HojaVidaComponent implements OnInit {
  pageAdministrador: number;
  pageProfesor: number;
  pagePsicologo: number;
  pageJustificacion: number;
  pageAlerta: number;
  pageSizeAlerta:number;
  pageSizeJustificacion: number;
  pageSizeObservacionAdministrador: number;
  collectionSizeObservacionAdministrador: number;
  collectionSizeAlerta:number;
  pageSizeObservacionProfesor: number;
  collectionSizeJustificacion: number;
  collectionSizeObservacionProfesor: number;
  pageSizeObservacionPsicologo: number;
  collectionSizeObservacionPsicologo: number;
  observaciones_admin:any
  observaciones_profe:any
  observaciones_psico:any
  hoja_vida:any;
  id_hoja_vida:string;
  justificaciones: Justificacion[];
  alertas: Alerta[];


    // Radar
    public radarChartOptions: RadialChartOptions = {
      responsive: true,
    };
    public radarChartLabels: Label[] = [];
  
    public radarChartData: ChartDataSets[] = [{ data: [], label: '' }];
    public radarChartType: ChartType = 'radar';



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
  
    public barChartDataAsignatura: ChartDataSets[] = [{ data: [], label: '' }];

    public barChartOptionsAnual: ChartOptions = {
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
    public barChartLabelsAnual: Label[] = [];
    public barChartTypeAnual: ChartType = 'bar';
    public barChartLegendAnual = true;
    public barChartPluginsAnual = [pluginDataLabels];
  
    public barChartDataAnual: ChartDataSets[] = [{ data: [], label: '' }];

  token: string
  constructor(private _alumnoService:AlumnoService, 
    private _observacionService: ObservacionService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _localService: LocalService,
    private _justificacionService: JustificacionService,
    private _alertaService: AlertaService
    ) {
    this.hoja_vida=[]
    this.observaciones_admin = []
    this.observaciones_profe = []
    this.observaciones_psico = []
    this.alertas = []
    this.justificaciones = []
    this.pageAdministrador = 1;
    this.pageProfesor = 1;
    this.pagePsicologo = 1;
    this.pageJustificacion = 1;
    this.pageAlerta = 1;
    this.pageSizeAlerta = 4;
    this.pageSizeObservacionAdministrador = 4;
    this.pageSizeObservacionProfesor = 4;
    this.pageSizeObservacionPsicologo = 4;
    this.pageSizeJustificacion = 4;
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_hoja_vida=this._activatedRoute.snapshot.paramMap.get('id')
    this.getHojaVida(this.id_hoja_vida);
    this.getObservacionesAdministrador()
    this.getObservacionesProfesor()
    this.getObservacionesPsicologo()
    this.getJustificaciones()
    this.getAlertasAlumno()
    this.getAlumnoGraficoRendimiento()
    this.getAlumnoGraficoAsistencia()
  }

  public getAlumnoGraficoRendimiento(){
    this._alumnoService.getAlumnoGraficoRendimiento(this.id_hoja_vida,this.token).subscribe((data:any)=>{
      this.radarChartLabels = data['labels']
      this.radarChartData = data['data']
    })
  }

  public getAlumnoGraficoAsistencia(){
    this._alumnoService.getAlumnoGraficoAsistencia(this.id_hoja_vida,this.token).subscribe((data:any)=>{
      this.barChartLabelsAsignatura = data['grafico_asignatura'].labels
      this.barChartDataAsignatura = data['grafico_asignatura'].data
      this.barChartLabelsAnual = data['grafico_anual'].labels
      this.barChartDataAnual = data['grafico_anual'].data
    })
  }

  public getHojaVida(id:string){
  	this._alumnoService.getHojaVida(id,this.token).subscribe((data: Array<any>) => {
      this.hoja_vida = data;
      this.hoja_vida.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+this.hoja_vida.imagen
    });
  }

  public getObservacionesAdministrador(){
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_ADMINISTRADOR',this.token).subscribe(
      (data:any)=>{
        this.observaciones_admin = data
        this.collectionSizeObservacionAdministrador = this.observaciones_admin.length
      })
  }

  public getObservacionesProfesor(){
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_PROFESOR',this.token).subscribe(
      (data:any)=>{
        this.observaciones_profe = data
        this.collectionSizeObservacionProfesor = this.observaciones_profe.length
      }
    )
  }

  public getObservacionesPsicologo(){
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_PSICOLOGO',this.token).subscribe(
      (data:any)=>{
        this.observaciones_psico = data
        this.collectionSizeObservacionPsicologo = this.observaciones_psico.length
      }
    )
  }

  public getJustificaciones(){
    this._justificacionService.getJustificacionesAlumno(this.id_hoja_vida,this.token).subscribe((data: Justificacion[])=>{
      this.justificaciones = data
      this.collectionSizeJustificacion = this.justificaciones.length
    })
  }

  public getAlertasAlumno(){
    this._alertaService.getAlertasAlumno(this.id_hoja_vida,this.token).subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
    })
  }


  get observaciones_administrador_tabla(): any[] {
    return this.observaciones_admin
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador, (this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador + this.pageSizeObservacionAdministrador);
  }

  get justificaciones_tabla(): Justificacion[] {
    return this.justificaciones
      .map((justificacion, i) => ({id: i + 1, ...justificacion}))
      .slice((this.pageJustificacion - 1) * this.pageSizeJustificacion, (this.pageJustificacion - 1) * this.pageSizeJustificacion + this.pageSizeJustificacion);
  }

  get alertas_tabla(): Alerta[] {
    return this.alertas
      .map((alerta, i) => ({id: i + 1, ...alerta}))
      .slice((this.pageAlerta - 1) * this.pageSizeAlerta, (this.pageAlerta - 1) * this.pageSizeAlerta + this.pageSizeAlerta);
  }

  get observaciones_psicologo_tabla(): any[] {
    return this.observaciones_psico
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pagePsicologo - 1) * this.pageSizeObservacionPsicologo, (this.pagePsicologo - 1) * this.pageSizeObservacionPsicologo + this.pageSizeObservacionPsicologo);
  }

  get observaciones_profesor_tabla(): any[] {
    return this.observaciones_profe
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pageProfesor - 1) * this.pageSizeObservacionProfesor, (this.pageProfesor - 1) * this.pageSizeObservacionProfesor + this.pageSizeObservacionProfesor);
  }

  public cancelar(){
    this.router.navigateByUrl('/admin/perfiles');
  }

  public modalNuevaObservacion(){
    swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Tipo de observación',
        input: 'select',
        inputOptions: {
          'OBSERVACION_ADMINISTRADOR': 'Administrador',
          'OBSERVACION_PSICOLOGO': 'Psicologo',
        },
        inputPlaceholder: 'Seleccione un tipo',
      },
      {
        title: 'Título Observación',
        input: 'text',
        inputPlaceholder: 'Ingrese un título...',
      },
      {
        title: 'Observación',
        input: 'textarea',
        inputPlaceholder: 'Ingrese su observación aquí...',
      }
    ]).then((result) => {
      if (result.value) {
        if(result.value[0]=="" || result.value[1]=="" || result.value[2]=="" ){
          swal.fire({
            title: 'Error',
            type: 'error',
            text : 'Debe completar todos los campos para realizar una observación'
          }).then((result)=>{
            if(result){
              this.modalNuevaObservacion();
            }
          })
        }
        else{
          this._storageService.getCurrentUser().nombres
          var usuario = this._storageService.getCurrentUser().nombres+" "+this._storageService.getCurrentUser().apellido_paterno+" "+this._storageService.getCurrentUser().apellido_materno
          this._observacionService.postObservacion(
            { 'alumno': this.id_hoja_vida,
              'tipo':result.value[0],
              'titulo':result.value[1],
              'contenido':result.value[2],
              'nombre_personal': usuario
            },this.token
          ).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha registrado una nueva observación exitosamente!',
                type: 'success'
              }).then((result)=>{
                if(result){
                  this.getObservacionesAdministrador();
                  this.getObservacionesProfesor();
                  this.getObservacionesPsicologo();
                }
              })
            }
          })
        }
      }
    })
  }
}



