import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Alerta } from 'src/app/modelos/alerta.model';
import { AlertaService} from 'src/app/servicios/alerta.service';
import { AlertaTablaService } from 'src/app/servicios/tablas/tabla.alerta.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { NgbdSortableHeader , SortEvent} from 'src/app/servicios/sorteable.directive';


@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
  alertas$: Observable<Alerta[]>;
  total$: Observable<number>;
  filtroSort: any[]
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private _alertaService: AlertaService, private _alertaTablaService: AlertaTablaService) 
  { 
    this.alertas$ = this._alertaTablaService.alertas$;
    this.total$ = this._alertaTablaService.total$;
    this.filtroSort= ['','','','','']
  }

  ngOnInit() {
    this.getGraficoAlertasCursos()
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.filtroSort= ['','','','','']
    if(column=="alumno"){
      this.filtroSort[0]= direction
    }
    if(column=="curso"){
      this.filtroSort[1]= direction
    }
    if(column=="fecha"){
      this.filtroSort[2]= direction
    }
    if(column=="asignatura"){
      this.filtroSort[3]= direction
    }
    if(column=="tipo"){
      this.filtroSort[4]= direction
    }

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this._alertaTablaService.sortColumn = column;
    this._alertaTablaService.sortDirection = direction;
  }

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [{ data: [], label: '' }];
  public radarChartType: ChartType = 'radar';

  getGraficoAlertasCursos(){
    this._alertaService.getGraficoAlertasCursos().subscribe((data:any)=>{
      this.radarChartLabels = data['labels']
      this.radarChartData = data['data']
    })
  }

}
