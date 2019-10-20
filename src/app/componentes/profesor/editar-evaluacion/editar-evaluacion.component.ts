import { Component, OnInit, ViewChild} from '@angular/core';
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
import { Label, MultiDataSet,} from 'ng2-charts';
import swal from'sweetalert2';
import { Alumno } from 'src/app/modelos/alumno.model';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CursoService } from 'src/app/servicios/curso.service';
import { Curso } from 'src/app/modelos/curso.model';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-editar-evaluacion',
  templateUrl: './editar-evaluacion.component.html',
  styleUrls: ['./editar-evaluacion.component.css']
})
export class EditarEvaluacionComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'app';
  token: string;
  id_evaluacion: string
  id_prueba: string
  id_curso: string;
  prueba:Prueba;
  cursoSeleccionado: string
  cursos: Curso[]
  id_curso_seleccionado:string
  alumnos_curso:Alumno[]
  columnDefs:any
  rowData = [];
  constructor(
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _localService: LocalService,
    private _evaluacionService: EvaluacionService,
    private _alumnoService: AlumnoService,
    private _router:Router
  ) { 
    this.prueba = new Prueba()
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_evaluacion = this._activatedRoute.snapshot.paramMap.get('id');
    this.getEvaluacion()
  }


  getEvaluacion(){
    this._evaluacionService.getEvaluacion(this.id_evaluacion,this.token).subscribe((data:Evaluacion)=>{
      console.log(data)
    })
  }

  volver(){
    this._router.navigateByUrl('/profesor/detalle/evaluacion/'+this.id_evaluacion)
  }

}
