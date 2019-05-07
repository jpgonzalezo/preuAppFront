import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/modelos/curso.model';
import { CursoService } from 'src/app/servicios/curso.service';
import { Asistencia } from 'src/app/modelos/asistencia.model';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  pageAsistencia: number;
  pageSizeAsistencia: number;
  collectionSizeAsistencia: number;
  cursos: Curso[];
  asistencias: Asistencia[]
  paginacionTabla: any[]
  constructor(private _router:Router,private _asistenciaService: AsistenciaService,private _cursoService: CursoService) {
    this.pageAsistencia=1;
    this.pageSizeAsistencia = 4;
    this.cursos = []
    this.asistencias = []
  }

  ngOnInit() {
    this.paginacionTabla = []
    this.getCursos()
    this.getAsistencias()
  }

  getAsistencias(){
    this._asistenciaService.getAsistencias().subscribe((data:Asistencia[])=>{
      this.asistencias = data
      console.log(data)
      this.collectionSizeAsistencia = this.asistencias.length
    })
  }

  getCursos(){
    this._cursoService.getCursos().subscribe((data:Curso[])=>{
      this.cursos=data
    })
  }

  get asistencias_tabla(): any[] {
    return this.asistencias
      .map((asistencia, i) => ({id: i + 1, ...asistencia}))
      .slice((this.pageAsistencia - 1) * this.pageSizeAsistencia, (this.pageAsistencia - 1) * this.pageSizeAsistencia + this.pageSizeAsistencia);
  }

  generarNuevaAsistencia(){
    this._router.navigateByUrl('/admin/asistencia/nueva_asistencia');
  }

  detalleAsistencia(id_asistencia:string){
    this._router.navigateByUrl('/admin/asistencia/detalle_asistencia/'+id_asistencia);
  }

}
