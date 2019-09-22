import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/servicios/curso.service';
import { Curso } from 'src/app/modelos/curso.model';
import Swal from 'sweetalert2';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html'
})
export class CursoComponent implements OnInit {
  cursos: Curso[]
  pageCurso: number;
  pageSizeCurso: number;
  collectionSizeCurso: number;
  token: string
  load = false
  constructor(private _cursoService: CursoService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private router:Router) 
  {
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

  deleteCurso(id:string){
    Swal.fire({
      title: 'Desea eliminar este colegio?',
      text: "Estos cambios son irreversibles!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.dismiss){}
      if (result.value) {
        this._cursoService.deleteCurso(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='exito'){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha eliminado el colegio correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              if(result2 || result2.dismiss){
                this.getCursos()
              }
            })
          }
        })
      }
    })
  }

  getCursos(){
    this.load=true
    this._cursoService.getCursos(this.token).subscribe((data:Curso[])=>{
      this.cursos = data
      this.collectionSizeCurso = this.cursos.length
      this.load=false
    })
  }

  generarNuevoCurso(){
    Swal.fire({
      type:'question',
      input: 'text',
      title: 'Nuevo Curso',
      text: 'Ingrese el nombre del nuevo curso',
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result)=>{
      if(result.value){
        this._cursoService.postCurso({'nombre':result.value},this.token).subscribe((data:any)=>{
          if(data['Response']=="exito"){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha creado el curso exitosamente',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            }).then((result)=>{
              this.getCursos()
            })
          }
        })
      }
    })
	}

  generarVistaDetalleCurso(id:string){
    this.router.navigateByUrl('/admin/cursos/detalle_curso/'+id);
  }

}
