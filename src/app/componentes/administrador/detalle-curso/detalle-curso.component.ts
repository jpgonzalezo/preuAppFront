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
import { Config } from 'src/app/config';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import Swal from 'sweetalert2';


import { SingleDataSet, Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent implements OnInit {
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


  constructor(private _activatedRoute:ActivatedRoute, 
    private _alumnoService:AlumnoService,
    private _cursoService:CursoService,
    private _asistenciaService: AsistenciaService,
    private _alertaService: AlertaService,
    private _asignaturaService: AsignaturaService,
    private _router: Router) {
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
    this.id_curso=this._activatedRoute.snapshot.paramMap.get('id');
    this.getCurso();
    this.getAlumnosCurso();
    this.getAsistenciaCurso();
    this.getAlertasCurso();
  }



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  getCurso(){
    this._cursoService.getCurso(this.id_curso).subscribe((data:Curso)=>{
      this.curso = data;
      this.asignaturas = data.asignaturas
      this.collectionSizeAsignatura = data.asignaturas.length
    })

    this._cursoService.getGraficoAsistencia(this.id_curso).subscribe((data:any)=>{
      this.barChartLabels = data['labels']
      this.barChartData = data['data']
    })

    this._cursoService.getGraficoAsistenciaAsignatura(this.id_curso).subscribe((data:any)=>{
      this.barChartLabelsAsignatura = data['labels']
      this.barChartDataAsignatura = data['data']
    })

    this._cursoService.getGraficoAsignaturas(this.id_curso).subscribe((data:any)=>{
      this.polarAreaChartData = data['data']
      this.polarAreaChartLabels = data['labels']
    })

    this.activoGrafico = true
  }

  getAlumnosCurso(){
    this._alumnoService.getAlumnosCurso(this.id_curso).subscribe((data:Alumno[])=>{
      this.alumnos = data
      this.collectionSizeAlumno = this.alumnos.length;
      for(let alumno of this.alumnos){
        alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
      }
    })   
  }

  getAsistenciaCurso(){
    this._asistenciaService.getAsistenciasCurso(this.id_curso).subscribe((data:Asistencia[])=>{
      this.asistencias = data;
      this.collectionSizeAsistencia = this.asistencias.length
    })
  }

  generarVistaHojaVida(id:string){
    this._router.navigateByUrl('/admin/perfiles/hoja_vida/'+id);
  }

  getAlertasCurso(){
    this._alertaService.getAlertasCurso(this.id_curso).subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
    })
  }

  volver(){
    this._router.navigateByUrl('/admin/cursos');
  }
  get alumnos_tabla(): Alumno[] {
    return this.alumnos
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumno - 1) * this.pageSizeAlumno, (this.pageAlumno - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
  }

  deleteAsignaturaCurso(id_asignatura:string){
    Swal.fire({
      title: 'Desea eliminar la asignatura del curso?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result)=>{
      if(result.dismiss==null){
        this._cursoService.deleteCursoAsignatura(this.id_curso,id_asignatura).subscribe((data:any)=>{
          if(data['Response']=="exito"){
            Swal.fire({
              title:'Eliminado!',
              text:'Se ha eliminado la asignatura exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getCurso()
            })
          }
        })
      }
    })
  }

  agregarAsignatura(){
    this._asignaturaService.getAsignaturas().subscribe((data:Asignatura[])=>{
      var asignaturas={}
      for(let asignatura of data){
        var bandera = true
        for(let asignatura_curso of this.curso.asignaturas){
          if(asignatura.id==asignatura_curso.id){
            bandera = false
          }
        }
        if(bandera){
          asignaturas[asignatura.id] = asignatura.nombre
        }
      }

      Swal.fire({
        title: 'Agregar Asignatura',
        text: 'Seleccione una asignatura',
        input: 'select',
        inputOptions: asignaturas,
        inputPlaceholder: 'Asignaturas',
        showCancelButton: true,
        confirmButtonColor: '#2dce89',
        cancelButtonColor: '#fb6340',
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
      }).then((result)=>{
        if(result.dismiss==null){
          this._cursoService.addAsignatura(this.id_curso,result.value).subscribe((data:any)=>{
            if(data['Response']=="exito"){
              Swal.fire({
                title:'Agregado!',
                text:'Se ha agregado la asignatura exitosamente.',
                type:'success',
                confirmButtonColor: '#2dce89',
              }).then((result)=>{
                this.getCurso()
              })
            }
          })
        }
      })
    })
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