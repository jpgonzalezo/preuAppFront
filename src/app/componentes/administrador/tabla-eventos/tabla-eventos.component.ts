import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EventoService } from 'src/app/servicios/evento.service';
import { EventoTablaService } from 'src/app/servicios/tablas/tabla.evento.service';
import { SolicitudEventoTablaService } from 'src/app/servicios/tablas/tabla.solicitudes.service';
import { Evento } from 'src/app/modelos/evento.model';
import swal from'sweetalert2';
import { Observable } from 'rxjs';
import { NgbdSortableHeader , SortEvent} from 'src/app/servicios/sorteable.directive';

@Component({
  selector: 'app-tabla-eventos',
  templateUrl: './tabla-eventos.component.html',
  styleUrls: ['./tabla-eventos.component.css']
})
export class TablaEventosComponent implements OnInit {
  eventos$: Observable<Evento[]>;
  totalEventos$: Observable<number>;
  filtroSort: any[]
  solicitudes$: Observable<Evento[]>;
  totalSolicitudes$: Observable<number>;
  filtroSortSolicitud: any[]
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  constructor(
    private _eventoTablaService: EventoTablaService,
    private _solicitudEventoService: SolicitudEventoTablaService,
    private _eventoService: EventoService
  ) {
    this.eventos$ = this._eventoTablaService.eventos$;
    this.totalEventos$ = this._eventoTablaService.total$;
    this.filtroSort= ['','','']
    this.solicitudes$ = this._solicitudEventoService.eventos$;
    this.totalEventos$ = this._solicitudEventoService.total$;
    this.filtroSortSolicitud= ['','','']
  }

  ngOnInit() {
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.filtroSort= ['','','','','']
    if(column=="start"){
      this.filtroSort[0]= direction
    }
    if(column=="title"){
      this.filtroSort[1]= direction
    }
    if(column=="curso"){
      this.filtroSort[2]= direction
    }

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this._eventoTablaService.sortColumn = column;
    this._eventoTablaService.sortDirection = direction;
  }

  onSortSolicitud({column, direction}: SortEvent) {
    // resetting other headers
    this.filtroSort= ['','','','','']
    if(column=="start"){
      this.filtroSort[0]= direction
    }
    if(column=="title"){
      this.filtroSort[1]= direction
    }
    if(column=="curso"){
      this.filtroSort[2]= direction
    }

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this._solicitudEventoService.sortColumn = column;
    this._solicitudEventoService.sortDirection = direction;
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
                this._solicitudEventoService.getEventos()
                this._eventoTablaService.getEventos()
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
                this._solicitudEventoService.getEventos()
                this._eventoTablaService.getEventos()
              }
            })
          }
        })
      }
    })
  }


}
