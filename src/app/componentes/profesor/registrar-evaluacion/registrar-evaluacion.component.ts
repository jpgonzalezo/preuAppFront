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
import { environment } from 'src/environments/environment';
import { RutPipe } from 'ng2-rut';

@Component({
  selector: 'app-registrar-evaluacion',
  templateUrl: './registrar-evaluacion.component.html',
  styleUrls: ['./registrar-evaluacion.component.css']
})
export class RegistrarEvaluacionComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'app';
  token: string;
  id_evaluacion: string;
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
    private _pruebaService: PruebaService,
    private _cursoService: CursoService,
    private _alumnoService: AlumnoService,
    private _router:Router,
    private rutPipe: RutPipe
  ) { 
    this.prueba = new Prueba()
    this.cursoSeleccionado = "Seleccione un curso"
    this.id_curso_seleccionado = ""
    this.cursos = []
    this.alumnos_curso = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_evaluacion = this._activatedRoute.snapshot.paramMap.get('id');
    this.id_curso = this._activatedRoute.snapshot.paramMap.get('id_curso');
    this.getPrueba()
    this.getCursos()
    this.getColumDef()
    this.getRowData()
  }
  getColumDef(){
    this._evaluacionService.getColumnDefs(this.id_evaluacion,this.token).subscribe((data:any[])=>{
      console.log(data)
      this.columnDefs = data
    })
  }

  getRowData(){
    this._evaluacionService.getEvaluacionGridRegistrar(this.id_evaluacion,this.id_curso,this.token).subscribe((data:any[])=>{
      this.rowData = data
      this.rowData.forEach(element => {
        element['rut'] = this.rutPipe.transform(element['rut']);
      });
    })
  }

  getCursos(){
    this._cursoService.getCursos(this.token).subscribe((data:Curso[])=>{
      this.cursos = data
    })
  }

  getPrueba(){
    this._pruebaService.getPrueba(this.id_evaluacion,this.token).subscribe((data:Prueba)=>{
      this.prueba = data
    })
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
        this._evaluacionService.registrarEvaluaciones(this.id_evaluacion,this.token,data).subscribe((data)=>{
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

  volver(){
    this._router.navigateByUrl('/profesor/detalle/evaluacion/'+this.id_evaluacion)
  }

}
