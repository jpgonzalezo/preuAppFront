import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from 'src/app/servicios/curso.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { EventoService } from 'src/app/servicios/evento.service';
import { Curso } from 'src/app/modelos/curso.model';
import { LocalService } from 'src/app/servicios/local.service';
import { Evento } from 'src/app/modelos/evento.model';
import swal from'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  cursos: Curso[]
  token: string
  @ViewChild('calendar') calendarComponent: FullCalendarComponent// the #calendar in the template
  bootstrapPlugin = bootstrapPlugin
  esLocale = esLocale
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, bootstrapPlugin];
  calendarWeekends = true;
  calendarEvents: Evento[];
  load:boolean=true;
  constructor(
    private _cursoService: CursoService,
    private _storageService: StorageService,
    private _eventoService: EventoService,
    private _localService: LocalService
  ) { 
    this.cursos=[]
    this.calendarEvents = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getCursos()
    this.getEventos()
  }
  getCursos(){
    this._cursoService.getCursos(this.token).subscribe((data:Curso[])=>{
      this.cursos = data
    })
  }
  nuevoEvento(arg) {
    var cursos_dict = {}
    cursos_dict["TODOS_CURSOS"] = "Todos los cursos del preuniversitario";
    for(let curso of this.cursos){
      cursos_dict[curso.id] = curso.nombre
    }
    swal.fire({
      type: 'question',
      title: 'Nueva solicitud de evento',
      text: 'Desea agregar una nueva solicitud a la fecha '+arg.dateStr+' ?',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.dismiss==null){
        swal.mixin({
          confirmButtonColor: '#2dce89',
          cancelButtonColor: '#fb6340',
          confirmButtonText: 'Siguiente',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
          progressSteps: ['1', '2', '3']
        }).queue([
          {
            title: 'Nombre del Evento',
            text: 'Ingrese el título del evento',
            input: 'text',
            confirmButtonColor: '#2dce89',
            cancelButtonColor: '#fb6340',
            confirmButtonText: 'Siguiente',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
          },
          {
            title: 'Color Identificador',
            text: 'Seleccione un color con el que se identifique al evento',
            input: 'select',
            inputOptions: {
              '#f5365c': 'Rojo',
              '#ffd600': 'Amarillo',
              '#2dce89': 'Verde',
              '1179ef': 'Azul',
              '#fb6340': 'Naranja',
              '#8965e0': 'Morado',
            },
            inputPlaceholder: 'Seleccione un color',
            showCancelButton: true,
          },
          {
            title: 'Cursos preuniversitario',
            text: 'Seleccione el curso que participará en el evento',
            input: 'select',
            inputOptions: cursos_dict,
            inputPlaceholder: 'Seleccione un curso',
            showCancelButton: true,
          }
        ]).then((result) => {
          if (result.dismiss==null) {
            if(result.value[0] =="" || result.value[1] ==""|| result.value[2] ==""){
              swal.fire({
                type:'error',
                title:'Registro Invalido',
                text: 'Debe completar todos los campos para agregar un evento',
                confirmButtonColor: '#2dce89',
                confirmButtonText: 'Siguiente',
              }).then((result)=>{
                this.nuevoEvento(arg)
              })
            }
            else{
              this._eventoService.postEvento({"fecha":arg.dateStr,"title":result.value[0],"backgroundColor": result.value[1],"curso":result.value[2]},this.token).subscribe((data:any)=>{
                if(data['Response']=="exito"){
                  swal.fire({
                    type:'success',
                    title:'Registro Exitoso',
                    text:'Se ha creado el evento exitosamente',
                    confirmButtonColor: '#2dce89',
                    confirmButtonText: 'Siguiente'
                  }).then((result)=>{
                    this.getEventos()
                  })
                }
              })
            }
          }
        })
      }
    })
  }

  getEventos(){
    this.load=true;
    this._eventoService.getEventos(this.token).subscribe((data: Evento[])=>{
      this.calendarEvents = data
      this.load=false;
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
              }
            })
          }
        })
      }
    })
  }
}
