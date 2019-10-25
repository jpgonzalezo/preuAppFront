import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/modelos/curso.model';
import { Justificacion } from 'src/app/modelos/justificacion.model';
import { CursoService } from 'src/app/servicios/curso.service';
import { JustificacionService } from'src/app/servicios/justificacion.service';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html'
})
export class AsistenciaComponent implements OnInit {
  pageAsistencia: number;
  pageSizeAsistencia: number;
  collectionSizeAsistencia: number;
  pageJustificacion: number;
  pageSizeJustificacion: number;
  collectionSizeJustificacion: number;
  cursos: Curso[];
  asistencias: Asistencia[]
  justificaciones: Justificacion[]
  paginacionTabla: any[]
  token: string
  loadAsistencia:boolean = true
  loadJustificaciones:boolean = true
  constructor(private _justificacionService: JustificacionService,
    private _router:Router,
    private _asistenciaService: AsistenciaService,
    private _cursoService: CursoService,
    private _localService: LocalService,
    private _storageService: StorageService) 
  {
    this.pageAsistencia=1;
    this.pageSizeAsistencia = 10;
    this.pageJustificacion=1;
    this.pageSizeJustificacion = 10;
    this.cursos = []
    this.asistencias = []
    this.justificaciones = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.paginacionTabla = []
    this.getCursos()
    this.getAsistencias()
    this.getJustificaciones()
  }

  getAsistencias(){
    this.loadAsistencia = true
    this._asistenciaService.getAsistencias(this.token).subscribe((data:Asistencia[])=>{
      this.asistencias = data
      this.collectionSizeAsistencia = this.asistencias.length
      this.loadAsistencia= false
    })
  }

  getJustificaciones(){
    this.loadJustificaciones = true
    this._justificacionService.getJustificaciones(this.token).subscribe((data:Justificacion[])=>{
      this.justificaciones = data
      this.collectionSizeJustificacion = this.justificaciones.length
      this.loadJustificaciones = false
    })
  }

  getCursos(){
    this._cursoService.getCursos(this.token).subscribe((data:Curso[])=>{
      this.cursos=data
    })
  }

  deleteJustificacion(id:string){
    Swal.fire({
      title: 'Desea eliminar esta justificación?',
      text: "Estos cambios son irreversibles!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.dismiss==null) {
        this._justificacionService.deleteJustificacion(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='exito'){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha eliminado la justificación correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              this.getJustificaciones()
            })
          }
        })
      }
    })
  }

  get asistencias_tabla(): any[] {
    return this.asistencias
      .map((asistencia, i) => ({id: i + 1, ...asistencia}))
      .slice((this.pageAsistencia - 1) * this.pageSizeAsistencia, (this.pageAsistencia - 1) * this.pageSizeAsistencia + this.pageSizeAsistencia);
  }

  get justificaciones_tabla(): any[] {
    return this.justificaciones
      .map((justificacion, i) => ({id: i + 1, ...justificacion}))
      .slice((this.pageJustificacion - 1) * this.pageSizeJustificacion, (this.pageJustificacion - 1) * this.pageSizeJustificacion + this.pageSizeJustificacion);
  }
  generarNuevaAsistencia(){
    this._router.navigateByUrl('/admin/asistencia/nueva_asistencia');
  }

  detalleAsistencia(id_asistencia:string){
    this._router.navigateByUrl('/admin/asistencia/detalle_asistencia/'+id_asistencia);
  }

}
