import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Alerta } from 'src/app/modelos/alerta.model';
import { AlertaService} from 'src/app/servicios/alerta.service';
import { AlertaTablaService } from 'src/app/servicios/tabla.alerta.service';
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
  alertas: Alerta[]
  pageAlerta: number;
  pageSizeAlerta: number;
  collectionSizeAlerta: number;
  alertas$: Observable<Alerta[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private _alertaService: AlertaService, private _alertaTablaService: AlertaTablaService) 
  { 
    this.alertas = []
    this.pageAlerta = 1
    this.pageSizeAlerta = 10
    this.alertas$ = this._alertaTablaService.alertas$;
    this.total$ = this._alertaTablaService.total$;
  }

  ngOnInit() {
    //this.getAlertas()
    this.getGraficoAlertasCursos()

  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
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

   getAlertas(){
    this._alertaService.getAlertas().subscribe((data:Alerta[])=>{
      this.alertas = data
      this.collectionSizeAlerta = this.alertas.length
    })
   }


  getGraficoAlertasCursos(){
    this._alertaService.getGraficoAlertasCursos().subscribe((data:any)=>{
      this.radarChartLabels = data['labels']
      this.radarChartData = data['data']
    })
  }

  get alertas_tabla(): any[] {
    return this.alertas
      .map((colegio, i) => ({id: i + 1, ...colegio}))
      .slice((this.pageAlerta - 1) * this.pageSizeAlerta, (this.pageAlerta - 1) * this.pageSizeAlerta + this.pageSizeAlerta);
  }

}
