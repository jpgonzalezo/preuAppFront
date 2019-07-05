import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlumnoService } from '../../../servicios/alumno.service';
import { JustificacionService } from 'src/app/servicios/justificacion.service';
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

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
//TERCERO ACTUALIZAR LO QUE QUIERO MOSTRAR
export class MiPerfilComponent implements OnInit {
  pageAdministrador: number;
  pageProfesor: number;
  pagePsicologo: number;
  pageJustificacion: number;
  pageAlerta: number;
  pageSizeAlerta:number;
  pageSizeJustificacion: number;
  collectionSizeAlerta:number;
  collectionSizeJustificacion: number;
  hoja_vida:any;
  id_hoja_vida:string;
  justificaciones: Justificacion[];
  alertas: Alerta[];

  //GRAFICOS NG2-CHART
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
  constructor(
    private _alumnoService:AlumnoService, 
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _justificacionService: JustificacionService,
    private _alertaService: AlertaService
  ) { 
    this.hoja_vida=[]
    this.alertas = []
    this.justificaciones = []
    this.pageAdministrador = 1;
    this.pageProfesor = 1;
    this.pagePsicologo = 1;
    this.pageJustificacion = 1;
    this.pageAlerta = 1;
    this.pageSizeAlerta = 4;
    this.pageSizeJustificacion = 4;
  }

  ngOnInit() {
    this.id_hoja_vida=this._storageService.getCurrentUser().id
    this.getHojaVida(this.id_hoja_vida);
    this.getJustificaciones()
    this.getAlertasAlumno()
    this.getAlumnoGraficoRendimiento()
    this.getAlumnoGraficoAsistencia()
  }

  public getAlumnoGraficoRendimiento(){
    this._alumnoService.getAlumnoGraficoRendimiento(this.id_hoja_vida).subscribe((data:any)=>{
      this.radarChartLabels = data['labels']
      this.radarChartData = data['data']
    })
  }

  public getAlumnoGraficoAsistencia(){
    this._alumnoService.getAlumnoGraficoAsistencia(this.id_hoja_vida).subscribe((data:any)=>{
      this.barChartLabelsAsignatura = data['grafico_asignatura'].labels
      this.barChartDataAsignatura = data['grafico_asignatura'].data
      this.barChartLabelsAnual = data['grafico_anual'].labels
      this.barChartDataAnual = data['grafico_anual'].data
    })
  }

  public getHojaVida(id:string){
  	this._alumnoService.getHojaVida(id).subscribe((data: Array<any>) => {
      this.hoja_vida = data;
      this.hoja_vida.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+this.hoja_vida.imagen
    });
  }

  public getJustificaciones(){
    this._justificacionService.getJustificacionesAlumno(this.id_hoja_vida).subscribe((data: Justificacion[])=>{
      this.justificaciones = data
      this.collectionSizeJustificacion = this.justificaciones.length
    })
  }

  public getAlertasAlumno(){
    this._alertaService.getAlertasAlumno(this.id_hoja_vida).subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
    })
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


  public cancelar(){
    this.router.navigateByUrl('/admin/perfiles');
  }

}
