import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
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
  prueba:Prueba;
  evaluacion:Evaluacion;
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
      this.evaluacion = data
      this.prueba = data.prueba
      this.getColumDef()
      this.getRowData()
    })
  }

  getColumDef(){
    this._evaluacionService.getColumnDefs(this.prueba.id,this.token).subscribe((data:any[])=>{
      this.columnDefs = data
    })
  }

  getRowData(){
    this._evaluacionService.getEvaluacionGridRegistrarEditar(this.evaluacion.id,this.token).subscribe((data:any[])=>{
      this.rowData = data
    })
  }

  volver(){
    this._router.navigateByUrl('/profesor/detalle/evaluacion/'+this.prueba.id)
  }

  guardar(){
    var data = []
    this.agGrid.api.selectAll()
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    var selectedData = selectedNodes.map( node => node.data );
    selectedData.map( node => {
      var dict = {}
      dict['id'] = node.id
      for(let pregunta of this.prueba.preguntas){
        dict[pregunta.numero_pregunta] = node[pregunta.numero_pregunta.toString()]
      }
      data.push(dict)
    })
    this.agGrid.api.deselectAll()
    swal.fire({
      title: 'Guardar Evaluaciones',
      text: "Desea guardar las evaluaciones registradas?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.dismiss==null){
        this._evaluacionService.registrarEvaluacionEditada(this.id_evaluacion,this.token,data).subscribe((data)=>{
          if(data['Response']=="exito"){
            swal.fire({
              title:'Registro exitoso',
              text:'Se han guardado las evaluaciones correctamente correctamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.volver()
            })
          }
        })
      }
    })
  }

}
