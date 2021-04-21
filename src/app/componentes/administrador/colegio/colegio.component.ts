import { Component, OnInit } from '@angular/core';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Colegio } from 'src/app/modelos/colegio.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html'
})
export class ColegioComponent implements OnInit {
  pageColegio: number;
  pageSizeColegio: number;
  collectionSizeColegio: number;
  colegios:Colegio[];
  token: string
  load=false
  constructor(private _colegioService: ColegioService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private router: Router,
    ) 
  {
    this.pageColegio = 1;
    this.pageSizeColegio = 10;
    this.colegios = [];
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getColegios()
  }

  getColegios(){
    this.load=true
    this._colegioService.getColegios(this.token).subscribe((data:Colegio[])=>{
      this.colegios = data;
      this.collectionSizeColegio = this.colegios.length
      this.load=false
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
        this._colegioService.deleteColegio(id,this.token).subscribe((data:any)=>{
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

  get colegios_tabla(): any[] {
    return this.colegios
      .map((colegio, i) => ({id: i + 1, ...colegio}))
      .slice((this.pageColegio - 1) * this.pageSizeColegio, (this.pageColegio - 1) * this.pageSizeColegio + this.pageSizeColegio);
  }

  generarNuevoColegio(){
    this.router.navigateByUrl('/admin/colegios/nuevoColegio');
  }

}
