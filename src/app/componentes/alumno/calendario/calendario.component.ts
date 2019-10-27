import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from 'src/app/servicios/curso.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { EventoService } from 'src/app/servicios/evento.service';
import { Curso } from 'src/app/modelos/curso.model';
import { LocalService } from 'src/app/servicios/local.service';
import { Evento } from 'src/app/modelos/evento.model';
import { FullCalendarComponent } from '@fullcalendar/angular';
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
    this.getEventos()
  }

  getEventos(){
    this.load=true;
    this._eventoService.getEventos(this.token).subscribe((data: Evento[])=>{
      this.calendarEvents = data
      this.load=false;
    })
  }

}
