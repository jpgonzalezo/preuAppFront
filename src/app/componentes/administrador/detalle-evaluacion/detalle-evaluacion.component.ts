import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PruebaService } from 'src/app/servicios/prueba.service';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
import { TopicoService } from 'src/app/servicios/topico.service';
import { Prueba } from 'src/app/modelos/prueba.model';
import { Topico } from 'src/app/modelos/topico.model';
import { Respuesta } from 'src/app/modelos/respuesta.model'
import { Pregunta } from 'src/app/modelos/pregunta.model';
import { Evaluacion } from 'src/app/modelos/evaluacion.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet, Color} from 'ng2-charts';
import swal from'sweetalert2';
import { Alumno } from 'src/app/modelos/alumno.model';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-detalle-evaluacion',
  templateUrl: './detalle-evaluacion.component.html'
})
export class DetalleEvaluacionComponent implements OnInit {
  public colors: Color[] = [
    { backgroundColor: '#11cdef' },
    { backgroundColor: '#fb6340' },
    { backgroundColor: '#f5365c' }
  ];
  public colorsDoughnutChart: Color[] = [
    {
      backgroundColor: ['#11cdef', '#fb6340', '#f5365c', '#8965e0', '#ffd600'],
    }
  ];
  id_asignatura: string;
  id_evaluacion: string;
  prueba: Prueba;
  topicos: Topico[];
  preguntas: Pregunta[];
  evaluaciones: Evaluacion[];
  pageTopico: number;
  pageSizeTopico: number;
  collectionSizeTopico: number;
  pagePreguntas: number;
  pageSizePreguntas: number;
  collectionSizePreguntas: number;
  pageEvaluacionesRealizadas: number;
  pageSizeEvaluacionesRealizadas: number;
  collectionSizeEvaluacionesRealizadas: number;
  public barChartOptionsPreguntas: ChartOptions = {
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
  public barChartLabelsPreguntas: Label[] = [];
  public barChartTypePreguntas: ChartType = 'bar';
  public barChartLegendPreguntas = true;
  public barChartPluginsPreguntas = [pluginDataLabels];
  public barChartDataPreguntas: ChartDataSets[] = [{ data: [], label: '' }];
  public barChartOptionsTopicos: ChartOptions = {
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
  public barChartLabelsTopicos: Label[] = [];
  public barChartTypeTopicos: ChartType = 'bar';
  public barChartLegendTopicos = true;
  public barChartPluginsTopicos = [pluginDataLabels];
  public barChartDataTopicos: ChartDataSets[] = [{ data: [], label: '' }];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';
  token: string
  loadPrueba:boolean =true;
  loadEvaluacionesRealizadas:boolean =true;
  loadGraficoRendimientoPreguntas:boolean =true;
  loadGraficoRendimientoTopicos:boolean =true;
  loadGraficoRendimientoCursos:boolean =true;
  constructor(
    private _pruebaService: PruebaService, 
    private _activatedRoute: ActivatedRoute,
    private _evaluacionService: EvaluacionService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _router: Router) 
  {
    this.prueba = new Prueba()
    this.pageTopico = 1;
    this.pageSizeTopico = 10;
    this.pagePreguntas = 1;
    this.pageSizePreguntas = 10;
    this.pageEvaluacionesRealizadas = 1;
    this.pageSizeEvaluacionesRealizadas = 10;
    this.topicos = []
    this.evaluaciones = []
    this.preguntas  = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id_asignatura');
    this.id_evaluacion = this._activatedRoute.snapshot.paramMap.get('id_evaluacion');
    this.getPrueba()
    this.getEvaluacionesRealizadas()
    this.getGraficoRendimientoPreguntas()
    this.getGraficoRendimientoTopicos()
    this.getGraficoRendimientoCursos()
  }

  getGraficoRendimientoPreguntas(){
    this.loadGraficoRendimientoPreguntas = true;
    this._pruebaService.getGraficoRendimientoPreguntas(this.id_evaluacion,this.token).subscribe((data:any)=>{
      
      this.barChartLabelsPreguntas= data['labels']
      this.barChartDataPreguntas= data['data']
      this.loadGraficoRendimientoPreguntas = false;
    })
  }

  getGraficoRendimientoTopicos(){
    this.loadGraficoRendimientoTopicos = true;
    this._pruebaService.getGraficoRendimientoTopicos(this.id_evaluacion,this.token).subscribe((data:any)=>{
      this.barChartLabelsTopicos= data['labels']
      this.barChartDataTopicos= data['data']
      this.loadGraficoRendimientoTopicos = false;
    })
  }

  getGraficoRendimientoCursos(){
    this.loadGraficoRendimientoCursos = true;
    this._pruebaService.getGraficoRendimientoCursos(this.id_evaluacion,this.token).subscribe((data:any)=>{
      this.doughnutChartLabels= data['labels']
      this.doughnutChartData= data['data']
      this.loadGraficoRendimientoCursos = false;
    })
  }
  volver(){
    this._router.navigateByUrl('/admin/asignaturas/detalle_asignatura/'+this.id_asignatura);
  }

  getPrueba(){
    this.loadPrueba=true;
    this._pruebaService.getPrueba(this.id_evaluacion,this.token).subscribe((data:Prueba)=>{
      this.prueba = data
      this.topicos = data.topicos
      this.preguntas = data.preguntas
      this.collectionSizeTopico = this.topicos.length
      this.collectionSizePreguntas = this.prueba.preguntas.length
      this.loadPrueba=false;
    })
  }

  getEvaluacionesRealizadas(){
    this.loadEvaluacionesRealizadas=true;
    this._evaluacionService.getEvaluacionesPrueba(this.id_evaluacion,this.token).subscribe((data:Evaluacion[])=>{
      this.evaluaciones = data
      this.collectionSizeEvaluacionesRealizadas = this.evaluaciones.length
      this.loadEvaluacionesRealizadas=false;
    })
  }

  public verAlternativas(respuestas: Respuesta[], alumno:Alumno): void{
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

  get topicos_tabla(): Topico[]{
    return this.topicos
    .map((topico, i) => ({id: i + 1, ...topico}))
    .slice((this.pageTopico - 1) * this.pageSizeTopico, (this.pageTopico - 1) * this.pageSizeTopico + this.pageSizeTopico);
  }

  get preguntas_tabla(): Pregunta[]{
    return this.preguntas
    .map((pregunta, i) => ({id: i + 1, ...pregunta}))
    .slice((this.pagePreguntas - 1) * this.pageSizePreguntas, (this.pagePreguntas - 1) * this.pageSizePreguntas + this.pageSizePreguntas);
  }

  get evaluaciones_realizadas_tabla(): Evaluacion[]{
    return this.evaluaciones
    .map((evaluacion, i) => ({id: i + 1, ...evaluacion}))
    .slice((this.pageEvaluacionesRealizadas - 1) * this.pageSizeEvaluacionesRealizadas, (this.pageEvaluacionesRealizadas - 1) * this.pageSizeEvaluacionesRealizadas + this.pageSizeEvaluacionesRealizadas);
  }

}
