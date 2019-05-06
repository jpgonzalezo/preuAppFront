import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Profesor } from 'src/app/modelos/profesor';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent implements OnInit {
  asignatura: Asignatura;
  profesores: Profesor[]
  id_asignatura: string;
  pageProfesor: number;
  pageSizeProfesor: number;
  collectionSizeProfesor: number;
  constructor(private _asignaturaService: AsignaturaService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _profesorService: ProfesorService) {
    this.asignatura = new Asignatura();
    this.profesores = [];
    this.pageProfesor = 1;
    this.pageSizeProfesor = 5;
   }

  ngOnInit() {
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.getProfesoresAsignatura()
    this.getAsignatura()
  }

  get profesores_tabla(): Profesor[] {
    return this.profesores
    .map((profesor, i) => ({id: i + 1, ...profesor}))
    .slice((this.pageProfesor - 1) * this.pageSizeProfesor, (this.pageProfesor - 1) * this.pageSizeProfesor + this.pageSizeProfesor);
}

  getProfesoresAsignatura(){
    this._profesorService.getProfesoresAsignatura(this.id_asignatura).subscribe((data:Profesor[])=>{
      this.profesores = data
      this.collectionSizeProfesor = this.profesores.length;
      for(let alumno of this.profesores){
        alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
      }
    })   
  }

  getAsignatura(){
    this._asignaturaService.getAsignatura(this.id_asignatura).subscribe((data:Asignatura)=>{
      this.asignatura = data;
    })
  }

  volver(){
    this._router.navigateByUrl('/admin/asignaturas');
  }
}
