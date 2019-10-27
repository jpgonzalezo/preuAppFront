import { Component,OnInit } from '@angular/core';
import { AlumnoService } from '../../../servicios/alumno.service';
import { JustificacionService } from 'src/app/servicios/justificacion.service';
import { ObservacionService } from '../../../servicios/observacion.service';
import { AlertaService } from 'src/app/servicios/alerta.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';
import { Justificacion } from 'src/app/modelos/justificacion.model';
import { Alerta } from 'src/app/modelos/alerta.model';
import swal from 'sweetalert2';
import { Config } from 'src/app/config';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { LocalService } from 'src/app/servicios/local.service';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})
export class DetalleAlumnoComponent implements OnInit {
  pageAdministrador: number;
  pageProfesor: number;
  pagePsicologo: number;
  pageJustificacion: number;
  pageAlerta: number;
  pageSizeAlerta: number;
  pageSizeJustificacion: number;
  pageSizeObservacionAdministrador: number;
  collectionSizeObservacionAdministrador: number;
  collectionSizeAlerta: number;
  pageSizeObservacionProfesor: number;
  collectionSizeJustificacion: number;
  collectionSizeObservacionProfesor: number;
  pageSizeObservacionPsicologo: number;
  collectionSizeObservacionPsicologo: number;
  observaciones_admin: any
  observaciones_profe: any
  observaciones_psico: any
  hoja_vida: any;
  id_hoja_vida: string;
  justificaciones: Justificacion[];
  alertas: Alerta[];
  loading: boolean = true
  loadGraficoRendimiento: boolean = true
  loadGraficoAsistencia: boolean = true
  loadObservacionesAdministrador: boolean = true
  loadObservacionesProfesor: boolean = true
  loadObservacionPsicologo: boolean = true
  loadJustificaciones: boolean = true
  loadAlertasAlumno: boolean = true
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  public radarChartType: ChartType = 'radar';
  public barChartOptionsAsignatura: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{}]
    },
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
  public barChartDataAsignatura: ChartDataSets[] = [{
    data: [],
    label: ''
  }];

  public barChartOptionsAnual: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{}]
    },
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
  public barChartDataAnual: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  token: string
  constructor(
    private _alumnoService: AlumnoService,
    private _observacionService: ObservacionService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _localService: LocalService,
    private _justificacionService: JustificacionService,
    private _alertaService: AlertaService
  ) { 
    this.hoja_vida = []
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
    if (this._storageService.getCurrentToken() == null) {
      this.token = this._localService.getToken()
    } else {
      this.token = this._storageService.getCurrentToken()
    }
    this.id_hoja_vida = this._activatedRoute.snapshot.paramMap.get('id')
    this.getHojaVida(this.id_hoja_vida);
    this.getObservacionesAdministrador()
    this.getObservacionesProfesor()
    this.getObservacionesPsicologo()
    this.getJustificaciones()
    this.getAlertasAlumno()
    this.getAlumnoGraficoRendimiento()
    this.getAlumnoGraficoAsistencia()
  }

  public getAlumnoGraficoRendimiento() {
    this.loadGraficoRendimiento = true
    this._alumnoService.getAlumnoGraficoRendimiento(this.id_hoja_vida, this.token).subscribe((data: any) => {
      this.radarChartLabels = data['labels']
      this.radarChartData = data['data']
      this.loadGraficoRendimiento  = false
    })
  }

  public getAlumnoGraficoAsistencia() {
    this.loadGraficoAsistencia = true
    this._alumnoService.getAlumnoGraficoAsistencia(this.id_hoja_vida, this.token).subscribe((data: any) => {
      this.barChartLabelsAsignatura = data['grafico_asignatura'].labels
      this.barChartDataAsignatura = data['grafico_asignatura'].data
      this.barChartLabelsAnual = data['grafico_anual'].labels
      this.barChartDataAnual = data['grafico_anual'].data
      this.loadGraficoAsistencia = false
    })
  }

  public getHojaVida(id: string) {
    this.loading = true
    this._alumnoService.getHojaVida(id, this.token).subscribe((data: Array < any > ) => {
      this.hoja_vida = data;
      this.hoja_vida.imagen = Config.API_SERVER_URL + "/alumno_imagen/" + this.hoja_vida.imagen
      this.loading = false
    });
  }

  public getObservacionesAdministrador() {
    this.loadObservacionesAdministrador = true
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_ADMINISTRADOR', this.token).subscribe(
      (data: any) => {
        this.observaciones_admin = data
        this.collectionSizeObservacionAdministrador = this.observaciones_admin.length
        this.loadObservacionesAdministrador = false
      })
  }

  public getObservacionesProfesor() {
    this.loadObservacionesProfesor = true
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_PROFESOR', this.token).subscribe(
      (data: any) => {
        this.observaciones_profe = data
        this.collectionSizeObservacionProfesor = this.observaciones_profe.length
        this.loadObservacionesProfesor = false
      }
    )
  }

  public getObservacionesPsicologo() {
    this.loadObservacionPsicologo = true
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_PSICOLOGO', this.token).subscribe(
      (data: any) => {
        this.observaciones_psico = data
        this.collectionSizeObservacionPsicologo = this.observaciones_psico.length
        this.loadObservacionPsicologo = false
      }
    )
  }

  public getJustificaciones() {
    this.loadJustificaciones = true
    this._justificacionService.getJustificacionesAlumno(this.id_hoja_vida, this.token).subscribe((data: Justificacion[]) => {
      this.justificaciones = data
      this.collectionSizeJustificacion = this.justificaciones.length
      this.loadJustificaciones = false
    })
  }

  public getAlertasAlumno() {
    this.loadAlertasAlumno = true
    this._alertaService.getAlertasAlumno(this.id_hoja_vida, this.token).subscribe((data: Alerta[]) => {
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
      this.loadAlertasAlumno = false
    })
  }


  get observaciones_administrador_tabla(): any[] {
    return this.observaciones_admin
      .map((observacion, i) => ({
        id: i + 1,
        ...observacion
      }))
      .slice((this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador, (this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador + this.pageSizeObservacionAdministrador);
  }

  get justificaciones_tabla(): Justificacion[] {
    return this.justificaciones
      .map((justificacion, i) => ({
        id: i + 1,
        ...justificacion
      }))
      .slice((this.pageJustificacion - 1) * this.pageSizeJustificacion, (this.pageJustificacion - 1) * this.pageSizeJustificacion + this.pageSizeJustificacion);
  }

  get alertas_tabla(): Alerta[] {
    return this.alertas
      .map((alerta, i) => ({
        id: i + 1,
        ...alerta
      }))
      .slice((this.pageAlerta - 1) * this.pageSizeAlerta, (this.pageAlerta - 1) * this.pageSizeAlerta + this.pageSizeAlerta);
  }

  get observaciones_psicologo_tabla(): any[] {
    return this.observaciones_psico
      .map((observacion, i) => ({
        id: i + 1,
        ...observacion
      }))
      .slice((this.pagePsicologo - 1) * this.pageSizeObservacionPsicologo, (this.pagePsicologo - 1) * this.pageSizeObservacionPsicologo + this.pageSizeObservacionPsicologo);
  }

  get observaciones_profesor_tabla(): any[] {
    return this.observaciones_profe
      .map((observacion, i) => ({
        id: i + 1,
        ...observacion
      }))
      .slice((this.pageProfesor - 1) * this.pageSizeObservacionProfesor, (this.pageProfesor - 1) * this.pageSizeObservacionProfesor + this.pageSizeObservacionProfesor);
  }

  public cancelar(id:string) {
    this.router.navigateByUrl('/profesor/cursos/detalle/'+id);
  }

  public modalNuevaObservacion() {
    swal.mixin({
      input: 'text',
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
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
        if (result.value[0] == "" || result.value[1] == "") {
          swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Debe completar todos los campos para realizar una observación'
          }).then((result) => {
            if (result) {
              this.modalNuevaObservacion();
            }
          })
        } else {
          this._storageService.getCurrentUser().nombres
          this._observacionService.postObservacion({
            'alumno': this.id_hoja_vida,
            'tipo': "OBSERVACION_PROFESOR",
            'titulo': result.value[0],
            'contenido': result.value[1]
          }, this.token).subscribe((data: any) => {
            if (data['Response'] == 'exito') {
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha registrado una nueva observación exitosamente!',
                type: 'success',
                confirmButtonColor: '#5cb85c',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result) {
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
