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
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
import { environment } from 'src/environments/environment';
import swal from'sweetalert2';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {
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
  loading = false;
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
  token: string
  loadProfesoresAsignatura:boolean = true;
  loadAsignatura:boolean = true;
  loadAsistenciasAsignatura:boolean = true;
  loadPruebasAsignatura:boolean = true;
  loadAlertasAsignatura:boolean = true;
  loadTopicosAsignatura:boolean = true;
  loadGraficoRendimientoEvaluacionesAsignatura:boolean = true;
  loadGraficoAsistenciaAsignatura:boolean = true;
  constructor(
    private _asignaturaService: AsignaturaService,
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
    this.loadGraficoAsistenciaAsignatura=true;
    this._asignaturaService.getGraficoAsistenciaAsignaturaToken(this.token).subscribe((data:any)=>{
      this.barChartDataAsistencia = data['data'];
      this.barChartLabelsAsistencia = data['labels'];
      this.loadGraficoAsistenciaAsignatura=false;
    })
  }
  getGraficoRendimientoEvaluacionesAsignatura(){
    this.loadGraficoRendimientoEvaluacionesAsignatura=true;
    this._asignaturaService.getGraficoRendimientoEvaluacionesAsignaturaToken(this.token).subscribe((data:any)=>{
      this.barChartLabels = data['labels']
      this.barChartData = data['data']
      this.loadGraficoRendimientoEvaluacionesAsignatura=false;
    })
  }
  getProfesoresAsignatura(){
    this.loadProfesoresAsignatura=true;
    this._profesorService.getProfesoresAsignaturaToken(this.token).subscribe((data:Profesor[])=>{
      this.profesores = data
      this.collectionSizeProfesor = this.profesores.length;
      for(let alumno of this.profesores){
        alumno.imagen = environment.API_SERVER_URL+"/profesor_imagen/"+alumno.imagen
      }
      this.loadProfesoresAsignatura=false;
    })   
  }

  getAsignatura(){
    this.loadAsignatura=true;
    this._asignaturaService.getAsignaturaToken(this.token).subscribe((data:Asignatura)=>{
      this.asignatura = data;
      this.loadAsignatura=false;
    })
  }

  getAsistenciasAsignatura(){
    this.loadAsistenciasAsignatura=true;
    this._asistenciaService.getAsistenciasAsignaturaToken(this.token).subscribe((data:Asistencia[])=>{
      this.asistencias = data;
      this.collectionSizeAsistencia = this.asistencias.length;
      this.loadAsistenciasAsignatura=false;
    })
  }

  getPruebasAsignatura(){
    this.loadPruebasAsignatura=true;
    this._pruebaService.getPruebasAsignaturaToken(this.token).subscribe((data:Prueba[])=>{
      this.pruebas = data;
      this.collectionSizeEvaluacion = this.pruebas.length;
      this.loadPruebasAsignatura=false;
    })
  }

  getAlertasAsignatura(){
    this.loadAlertasAsignatura=true;
    this._alertaService.getAlertasAsignaturaToken(this.token).subscribe((data:Alerta[])=>{
      this.alertas = data
      for(let alerta of this.alertas){
        if(alerta.alumno.imagen==''){
          alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/default"
        }
        else{
          alerta.alumno.imagen = environment.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.imagen
        }
      }
      this.collectionSizeAlerta = this.alertas.length;
      this.loadAlertasAsignatura=false;
    })
  }

  getTopicosAsignatura(){
    this.loadTopicosAsignatura=true;
    this._topicoService.getTopicosAsignaturaToken(this.token).subscribe((data:Topico[])=>{
      this.topicos = data;
      this.collectionSizeTopico = this.topicos.length;
      this.loadTopicosAsignatura=false;
    })
  }

  updateVisible(id:string,visible:boolean){
    if(!visible){
      swal.fire({
        title: 'Desea activar esta evaluación?',
        text: "Una vez activada, esta podrá ser respondida por los alumnos.",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#fb6340',
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this._pruebaService.putVisible(id,this.token).subscribe((data:any)=>{
            if(data){
              this.loading = false
              swal.fire({
                title:'Activado!',
                text:'Se ha activado la evaluación correctamente.',
                type:'success',
                confirmButtonColor: '#2dce89',
              }).then((result)=>{
                this.getPruebasAsignatura();
              })
            }
            this.loading = false
          },
          (error)=>{
            this.loading = false;
            swal.fire({
              type:'error',
              title:'Error en el servidor',
              text:'Ocurrió un error en el servidor, intente más tarde',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            })
          })
        }
  
      })
    }
    else{
      swal.fire({
        title: 'Desea desactivar esta evaluación?',
        text: "La evaluacion dejará de estar disponible para los alumnos.",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#fb6340',
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this._pruebaService.putVisible(id,this.token).subscribe((data:any)=>{
            if(data){
              this.loading = false
              swal.fire({
                title:'Desactivado!',
                text:'Se ha desactivado la evaluación exitosamente.',
                type:'success',
                confirmButtonColor: '#2dce89',
              }).then((result)=>{
                this.getPruebasAsignatura();
              })
            }
            this.loading = false
          },
          (error)=>{
            this.loading = false;
            swal.fire({
              type:'error',
              title:'Error en el servidor',
              text:'Ocurrió un error en el servidor, intente más tarde',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            })
          })
        }
  
      })
    }

  }

  verDetalleEvaluacion(id_evaluacion:string){
    this._router.navigateByUrl('/profesor/detalle/evaluacion/'+id_evaluacion)
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
        this.loading = true
        this._topicoService.deleteTopico(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='borrado'){
            this.loading = false
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado el tópico exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getTopicosAsignatura();
            })
          }
          this.loading = false
        })
      }

    })
  }

  deleteEvaluacion(id:string){
    swal.fire({
      title: 'Desea borrar esta Evaluación?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.loading = true
        this._pruebaService.deletePrueba(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='borrado'){
            this.loading = false
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado la evaluación exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getPruebasAsignatura();
            })
          }
          else{
            this.loading = false
            swal.fire({
              title: 'Error en el registro',
              text: 'Ocurrió un error al borrar la evaluación.',
              type: 'error',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getPruebasAsignatura()
            })
          }
        })
      }
    })
  }

  nuevoTopico(){
    swal.fire({
      input:'text',
      title:'Nuevo Tópico',
      text:'Ingrese el nombre del nuevo tópico',
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      onOpen: function (){
        swal.disableConfirmButton();
        swal.getInput().addEventListener('keyup', function(e) {
          if((<HTMLInputElement>event.target).value == "" || parseInt((<HTMLInputElement>event.target).value)<=0) {
            swal.disableConfirmButton();
          } 
          else {
            swal.enableConfirmButton();
          }
          })
      }
    }).then((result)=>{
      if(result.dismiss==null){
        this.loading = true
        this._topicoService.postTopico(result.value,this.token).subscribe((data)=>{
          this.loading = false
          if(data['Response']=="exito"){
            swal.fire({
              title:'Registro exitoso!',
              text:'Se ha guardado el registro exitosamente.',
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


  nuevaEvaluacion(){
    var id_prueba = ""
    swal.mixin({
      title: 'Nueva Evaluación',
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2'],
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
    }).queue([
      {
        title: 'Nombre Evaluación',
        text: 'Ingrese el nombre para la evaluación',
        input: 'text',
        showCancelButton: true,
        onOpen: function (){
          swal.disableConfirmButton();
          swal.getInput().addEventListener('keyup', function(e) {
            if((<HTMLInputElement>event.target).value == "" || parseInt((<HTMLInputElement>event.target).value)<=0) {
              swal.disableConfirmButton();
            } 
            else {
              swal.enableConfirmButton();
            }
            })
        }
      },
      {
        title: 'Tipo de Evaluación',
        text: 'Seleccione el tipo de Evaluación',
        input: 'select',
        inputOptions: {
          '': 'Seleccione una evaluación',
          'TALLER': 'Taller',
          'TAREA': 'Tarea',
          'ENSAYO': 'Ensayo'
        },
        showCancelButton: true,
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value === "") {
              resolve('Debes seleccionar un tipo')
            } else {
              resolve()
            }
          })
        }
      }
    ]).then((result) => {
      if (result.dismiss==null) {
        this.loading = true
        this._pruebaService.postPrueba(result.value[0],result.value[1],this.token).subscribe((data)=>{
          if(data['Response']=="exito"){
            id_prueba = data['id']
            this.loading = false
            swal.fire({
              title: 'Agregar puntaje base?',
              text: "Si agrega un puntaje base a la evaluación se calculará el puntaje obtenido a partir de la cantidad de preguntas y la cantidad de preguntas correctas obtenidas. En caso contrario, el puntaje por pregunta será equitativo para completar los 850.",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#2dce89',
              cancelButtonColor: '#fb6340',
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
            }).then((result)=>{
              if(result.dismiss==null){
                //asignar punteje base
                swal.fire({
                  title: 'Puntaje Base',
                  text: 'Ingrese la cantidad de puntaje base con la que contará la evaluación',
                  input: 'number',
                  showCancelButton: true,
                  confirmButtonColor: '#2dce89',
                  cancelButtonColor: '#fb6340',
                  confirmButtonText: 'Aceptar',
                  cancelButtonText: 'Cancelar',
                  onOpen: function (){
                    swal.disableConfirmButton();
                    swal.getInput().addEventListener('keyup', function(e) {
                      if((<HTMLInputElement>event.target).value == "" || parseInt((<HTMLInputElement>event.target).value)<=0) {
                        swal.disableConfirmButton();
                      } 
                      else {
                        swal.enableConfirmButton();
                      }
                      })
                  }
                }).then((result)=>{
                  if(result.dismiss==null){
                    this._pruebaService.asignarPuntajeBase(id_prueba, result.value, this.token ).subscribe((data)=>{
                      if(data['Response']=="exito"){
                        swal.fire({
                          title: 'Registro exitoso',
                          text: 'Se ha guardado la evaluación exitosamente!',
                          type: 'success',
                          confirmButtonColor: '#2dce89',
                        }).then((result)=>{
                          this.getPruebasAsignatura()
                        })
                      }
                    })
                  }
                  else{
                    swal.fire({
                      title: 'Registro exitoso',
                      text: 'Se ha guardado la evaluación exitosamente!',
                      type: 'success',
                      confirmButtonColor: '#2dce89',
                    }).then((result)=>{
                      this.getPruebasAsignatura()
                    })
                  }
                })
              }
              else{
                swal.fire({
                  title: 'Registro exitoso',
                  text: 'Se ha guardado la evaluación exitosamente!',
                  type: 'success',
                  confirmButtonColor: '#2dce89',
                }).then((result)=>{
                  this.getPruebasAsignatura()
                })
              }
            })
          }
          else{
            swal.fire({
              title: 'Error en el registro',
              text: 'Ocurrió un error al guardar la evaluación.',
              type: 'error',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getPruebasAsignatura()
            })
          }
        })
      }
    })
  }

}
