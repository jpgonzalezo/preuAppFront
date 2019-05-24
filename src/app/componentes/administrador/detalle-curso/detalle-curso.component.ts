import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Curso } from 'src/app/modelos/curso.model';
import { Config } from 'src/app/config';
import { Asistencia } from 'src/app/modelos/asistencia.model';
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
  asistencias: Asistencia[]
  constructor(private _activatedRoute:ActivatedRoute, 
    private _alumnoService:AlumnoService,
    private _cursoService:CursoService,
    private _asistenciaService: AsistenciaService,
    private _router: Router) {
      this.pageAlumno = 1;
      this.pageSizeAlumno = 10;
      this.pageAsistencia = 1;
      this.pageSizeAsistencia = 10;
      this.alumnos = [];
      this.asistencias = [];
      this.curso = {'nombre':"",'id':''}
    }

  ngOnInit() {
    this.id_curso=this._activatedRoute.snapshot.paramMap.get('id');
    this.getCurso();
    this.getAlumnosCurso();
    this.getAsistenciaCurso();
  }

  getCurso(){
    this._cursoService.getCurso(this.id_curso).subscribe((data:Curso)=>{
      this.curso = data;
    })
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

  volver(){
    this._router.navigateByUrl('/admin/cursos');
  }
  get alumnos_tabla(): Alumno[] {
    return this.alumnos
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumno - 1) * this.pageSizeAlumno, (this.pageAlumno - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
  }

  get asistencias_tabla(): Asistencia[] {
    return this.asistencias
      .map((asistencia, i) => ({id: i + 1, ...asistencia}))
      .slice((this.pageAsistencia - 1) * this.pageSizeAsistencia, (this.pageAsistencia - 1) * this.pageSizeAsistencia + this.pageSizeAsistencia);
  }
}