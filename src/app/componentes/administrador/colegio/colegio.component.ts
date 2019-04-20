import { Component, OnInit } from '@angular/core';
//SERVICIOS
import { ColegioService } from 'src/app/servicios/colegio.service';
//MODELO
import { Colegio } from 'src/app/modelos/colegio.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.css']
})
export class ColegioComponent implements OnInit {
  pageColegio: number;
  pageSizeColegio: number;
  collectionSizeColegio: number;
  colegios:Colegio[];
  constructor(private _colegioService: ColegioService) {
    this.pageColegio = 1;
    this.pageSizeColegio = 10;
    this.colegios = [];
  }

  ngOnInit() {
    this.getColegios()
  }

  getColegios(){
    this._colegioService.getColegios().subscribe((data:Colegio[])=>{
      this.colegios = data;
      this.collectionSizeColegio = this.colegios.length
    })
  }

  deleteColegio(id:string){
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
        this._colegioService.deleteColegio(id).subscribe((data:any)=>{
          if(data['Response']=='exito'){
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha eliminado el colegio correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              if(result2 || result2.dismiss){
                this.getColegios()
              }
            })
          }
        })
      }
    })
  }

  generarNuevoColegio(){
		Swal.mixin({
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4']
    }).queue([
      {
        title: 'Nombre Colegio',
        text: 'Ingrese el nombre del colegio',
        input: 'text'
      },
      {
        title: 'Dirección',
        text: 'Ingrese la calle del colegio',
        input: 'text'
      },
      {
        title: 'Número Dirección',
        text: 'Ingrese la númeración',
        input: 'number'
      },
      {
        title: 'Comuna Dirección',
        text: 'Ingrese el nombre de la comuna',
        input: 'text'
      },
    ]).then((result) => {
      if (result.dismiss!='cancel' && 
        result.dismiss!='esc' && 
        result.dismiss!='backdrop' &&
        (result.value[0]=="" || result.value[1]=="" || result.value[3]==""))
      {
        Swal.fire({
          type: 'error',
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar',
          title:'Error en el registro',
          text: 'Debe completar todos los campos.'
        }).then((result2)=>{
          if(result2 || result2.dismiss){
            this.generarNuevoColegio()
          }
        })
      }
      if(result.dismiss== 'cancel'){
        return false
      }
      if(result.value == true){
        this._colegioService.postColegio(
          { 'nombre':result.value[0],
            'calle': result.value[1],
            'numero': result.value[2],
            'comuna': result.value[3]
          }).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              console.log("dsañlkd")
            }
          },
        (error)=>{
          Swal.fire({
            type:'error',
            title:'Error en el servidor',
            text:'Ocurrió un error en el servidor, intente más tarde',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar',
          })
        })
      }
    })
	}

  get colegios_tabla(): any[] {
    return this.colegios
      .map((colegio, i) => ({id: i + 1, ...colegio}))
      .slice((this.pageColegio - 1) * this.pageSizeColegio, (this.pageColegio - 1) * this.pageSizeColegio + this.pageSizeColegio);
  }

}
