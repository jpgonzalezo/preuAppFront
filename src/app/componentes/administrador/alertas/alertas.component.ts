import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/modelos/alerta.model';
import { AlertaService} from 'src/app/servicios/alerta.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

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
  constructor(private _alertaService: AlertaService) 
  { 
    this.alertas = []
    this.pageAlerta = 1
    this.pageSizeAlerta = 10
  }

  ngOnInit() {
    this.getAlertas()
    this.getGraficoAlertasCursos()
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
