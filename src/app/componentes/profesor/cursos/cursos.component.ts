import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/servicios/curso.service';
import { Curso } from 'src/app/modelos/curso.model';
import Swal from 'sweetalert2';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[]
  pageCurso: number;
  pageSizeCurso: number;
  collectionSizeCurso: number;
  token: string
  load = false
  constructor(
    private _cursoService: CursoService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private router:Router
  ) {
    this.pageCurso = 1;
    this.pageSizeCurso = 4;
    this.cursos = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getCursos()
  }

  get cursos_tabla(): any[] {
    return this.cursos
      .map((curso, i) => ({id: i + 1, ...curso}))
      .slice((this.pageCurso - 1) * this.pageSizeCurso, (this.pageCurso - 1) * this.pageSizeCurso + this.pageSizeCurso);
  }

  getCursos(){
    this.load=true
    this._cursoService.getCursos(this.token).subscribe((data:Curso[])=>{
      this.cursos = data
      this.collectionSizeCurso = this.cursos.length
      this.load=false
    })
  }

  generarVistaDetalleCurso(id:string){
    this.router.navigateByUrl('/profesor/cursos/detalle/'+id);
  }

}
