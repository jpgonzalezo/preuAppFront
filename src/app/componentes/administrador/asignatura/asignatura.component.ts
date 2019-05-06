import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { Asignatura } from 'src/app/modelos/asignatura.model';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {
  asignaturas: Asignatura[]
  pageAsignatura: number;
  pageSizeAsignatura: number;
  collectionSizeAsignatura: number;
  constructor(private _asignaturaService: AsignaturaService, private router:Router) {
    this.pageAsignatura = 1;
    this.pageSizeAsignatura = 4;
    this.asignaturas = []
  }

  ngOnInit() {
    this.getAsignaturas()
  }

  get asignaturas_tabla(): any[] {
    return this.asignaturas
      .map((asignatura, i) => ({id: i + 1, ...asignatura}))
      .slice((this.pageAsignatura - 1) * this.pageSizeAsignatura, (this.pageAsignatura - 1) * this.pageSizeAsignatura + this.pageSizeAsignatura);
  }

  deleteAsignatura(id:string){
    Swal.fire({
      title: 'Desea eliminar esta asignatura?',
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
        this._asignaturaService.deleteAsignatura(id).subscribe((data:any)=>{
          if(data['Response']=='exito'){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha eliminado la asignatura correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              if(result2 || result2.dismiss){
                this.getAsignaturas()
              }
            })
          }
        })
      }
    })
  }

  getAsignaturas(){
    this._asignaturaService.getAsignaturas().subscribe((data:Asignatura[])=>{
      this.asignaturas = data
      this.collectionSizeAsignatura = this.asignaturas.length
    })
  }

  generarNuevaAsignatura(){
    Swal.fire({
      type:'question',
      input: 'text',
      title: 'Nuevo Asignatura',
      text: 'Ingrese el nombre de la nueva asignatura',
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result)=>{
      if(result.value){
        this._asignaturaService.postAsignatura({'nombre':result.value}).subscribe((data:any)=>{
          if(data['Response']=="exito"){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha creado la asignatura exitosamente',
              confirmButtonColor: '#5cb85c',
              confirmButtonText: 'Aceptar',
            }).then((result)=>{
              this.getAsignaturas()
            })
          }
        })
      }
    })
	}

  generarVistaDetalleAsignatura(id:string){
    this.router.navigateByUrl('/admin/asignaturas/detalle_asignatura/'+id);
  }


}
