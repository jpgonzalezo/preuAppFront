import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EventoService } from 'src/app/servicios/evento.service';
import { Evento } from 'src/app/modelos/evento.model';
import swal from'sweetalert2';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html'
})
export class TablaEventosComponent implements OnInit {
  token: string
  eventos: Evento[]
  solicitudes: Evento[]
  pageEvento: number;
  pageSizeEvento: number;
  collectionSizeEvento: number;
  pageSolicitud: number;
  pageSizeSolicitud: number;
  collectionSizeSolicitud: number;
  load=false
  constructor(
    public _eventoService: EventoService,
    private _localService: LocalService,
    private _storageService: StorageService,
  ) {
    this.eventos = []
    this.solicitudes = []
    this.pageEvento = 1
    this.pageSizeEvento = 10
    this.pageSolicitud = 1
    this.pageSizeSolicitud =10
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }

    this.getEventos()
    this.getSolicitudes()
  }

  getEventos(){
    this.load = true
    this._eventoService.getEventos(this.token).subscribe((data:Evento[])=>{
      this.eventos = data
      this.collectionSizeEvento = this.eventos.length
      this.load=false
    })
  }

  getSolicitudes(){
    this._eventoService.getSolicitudesEventos(this.token).subscribe((data:Evento[])=>{
      this.solicitudes = data
      this.collectionSizeSolicitud = this.solicitudes.length
    })
  }

  get eventos_tabla(): any[] {
    return this.eventos
      .map((evento, i) => ({id: i + 1, ...evento}))
      .slice((this.pageEvento - 1) * this.pageSizeEvento, (this.pageEvento - 1) * this.pageSizeEvento + this.pageSizeEvento);
  }

  get solicitudes_tabla(): any[] {
    return this.solicitudes
      .map((solicitud, i) => ({id: i + 1, ...solicitud}))
      .slice((this.pageSolicitud - 1) * this.pageSizeSolicitud, (this.pageSolicitud - 1) * this.pageSizeSolicitud + this.pageSizeSolicitud);
  }

  aceptarEvento(id:string){
    swal.fire({
      title: 'Aceptar Evento',
      text: "Desea agregar este evento al calendario?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.dismiss){}
      if (result.value) {
        this._eventoService.aceptarEvento(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='exito'){
            swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha agregado el evento correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              if(result2 || result2.dismiss){
                this.getEventos()
                this.getSolicitudes()
              }
            })
          }
        })
      }
    })
  }

  deleteEvento(id:string){
    swal.fire({
      title: 'Desea eliminar este evento?',
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
        this._eventoService.deleteEvento(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='exito'){
            swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              text: 'Se ha eliminado el evento correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              if(result2 || result2.dismiss){
                this.getEventos()
                this.getSolicitudes()
              }
            })
          }
        })
      }
    })
  }


}
