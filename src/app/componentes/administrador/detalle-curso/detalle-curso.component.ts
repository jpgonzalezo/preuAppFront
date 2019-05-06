import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Curso } from 'src/app/modelos/curso.model';
import { Config } from 'src/app/config';
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
  constructor(private _activatedRoute:ActivatedRoute, 
    private _alumnoService:AlumnoService,
    private _cursoService:CursoService,
    private _router: Router) {
      this.pageAlumno = 1;
      this.pageSizeAlumno = 5;
      this.alumnos = [];
      this.curso = {'nombre':"",'id':''}
    }

  ngOnInit() {
    this.id_curso=this._activatedRoute.snapshot.paramMap.get('id');
    this.getAlumnosCurso();
    this.getCurso();
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
}