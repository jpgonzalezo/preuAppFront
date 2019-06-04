import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/servicios/curso.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { EventoService } from 'src/app/servicios/evento.service';
import { Curso } from 'src/app/modelos/curso.model';
import { Evento } from 'src/app/modelos/evento.model';
import swal from'sweetalert2';

@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrls: ['./tabla-eventos.component.css']
})
export class TablaEventosComponent implements OnInit {
  pageEvento: number;
  pageSizeEvento: number;
  collectionSizeEvento: number;
  pageSolicitud: number;
  pageSizeSolicitud: number;
  collectionSizeSolicitud: number;
  calendarEvents: Evento[];
  solicitudes: Evento[];
  constructor(
    private _cursoService: CursoService,
    private _storageService: StorageService,
    private _eventoService: EventoService
  ) {
    this.pageEvento =1
    this.pageSizeEvento=10
    this.pageSolicitud =1
    this.pageSizeSolicitud=10
    this.calendarEvents = []
    this.solicitudes = []
  }

  ngOnInit() {
    this.getEventos()
    this.getSolicitudesEvento()
  }

  get eventos_tabla(): any[] {
    return this.calendarEvents
      .map((evento, i) => ({id: i + 1, ...evento}))
      .slice((this.pageEvento - 1) * this.pageSizeEvento, (this.pageEvento - 1) * this.pageSizeEvento + this.pageSizeEvento);
  }

  get solicitudes_tabla(): any[] {
    return this.solicitudes
      .map((solicitud, i) => ({id: i + 1, ...solicitud}))
      .slice((this.pageSolicitud - 1) * this.pageSizeSolicitud, (this.pageSolicitud - 1) * this.pageSizeSolicitud + this.pageSizeSolicitud);
  }

  getEventos(){
    this._eventoService.getEventos().subscribe((data: Evento[])=>{
      this.calendarEvents = data
      this.collectionSizeEvento = this.calendarEvents.length
    })
  }

  getSolicitudesEvento(){
    this._eventoService.getSolicitudesEventos().subscribe((data: Evento[])=>{
      this.solicitudes = data
      this.collectionSizeSolicitud = this.solicitudes.length
    })
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
        this._eventoService.aceptarEvento(id).subscribe((data:any)=>{
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
                this.getSolicitudesEvento()
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
        this._eventoService.deleteEvento(id).subscribe((data:any)=>{
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
                this.getSolicitudesEvento()
              }
            })
          }
        })
      }
    })
  }

}
