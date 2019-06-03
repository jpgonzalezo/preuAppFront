import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadisticaService } from 'src/app/servicios/estadistica.service';
import { StorageService } from 'src/app/servicios/storage.service';
import swal from'sweetalert2';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: any
  constructor(private _estadisticaService: EstadisticaService,
              private _storageService: StorageService
  ) {
  }
  ngOnInit() {
    this.usuario = this._storageService.getCurrentUser()
  }


  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  bootstrapPlugin = bootstrapPlugin
  esLocale = esLocale
  monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }

}
