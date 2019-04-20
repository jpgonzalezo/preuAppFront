import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/servicios/curso.service';
import { Curso } from 'src/app/modelos/curso.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: Curso[]
  pageCurso: number;
  pageSizeCurso: number;
  collectionSizeCurso: number;
  constructor(private _cursoService: CursoService) {
    this.pageCurso = 1;
    this.pageSizeCurso = 10;
    this.cursos = []
  }

  ngOnInit() {
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
        this._cursoService.deleteCurso(id).subscribe((data:any)=>{
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
    this._cursoService.getCursos().subscribe((data:Curso[])=>{
      this.cursos = data
      this.collectionSizeCurso = this.cursos.length
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
        this._cursoService.postCurso({'nombre':result.value}).subscribe((data:any)=>{
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


}
