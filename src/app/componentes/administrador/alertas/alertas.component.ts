import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/modelos/alerta.model';
import { AlertaService} from 'src/app/servicios/alerta.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Config } from 'src/app/config';
@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html'
})
export class AlertasComponent implements OnInit {
  alertas: Alerta[]
  token: string
  pageAlerta: number;
  pageSizeAlerta: number;
  collectionSizeAlerta: number;
  contador= 0
  constructor(private _localService: LocalService,
    private _alertaService: AlertaService,
    private _storageService: StorageService,
  ) 
  { 
    this.pageAlerta = 1;
    this.pageSizeAlerta = 10;
    this.alertas = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getGraficoAlertasCursos()
    this.getAlertas()
  }

  getAlertas(){
    this._alertaService.getAlertas(this.token).subscribe((data:Alerta[])=>{
      this.alertas = data
      for(let alerta of this.alertas){
        if(alerta.alumno.imagen==''){
          alerta.alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/default"
        }
        else{
          alerta.alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alerta.alumno.imagen
        }
      }
      this.collectionSizeAlerta = this.alertas.length
      if(this.contador <2 ){
        this.contador = this.contador +1
      }
    })
  }

  get alertas_tabla(): any[] {
    return this.alertas
      .map((alerta, i) => ({id: i + 1, ...alerta}))
      .slice((this.pageAlerta - 1) * this.pageSizeAlerta, (this.pageAlerta - 1) * this.pageSizeAlerta + this.pageSizeAlerta);
  }
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [{ data: [], label: '' }];
  public radarChartType: ChartType = 'radar';

  getGraficoAlertasCursos(){
    this._alertaService.getGraficoAlertasCursos(this.token).subscribe((data:any)=>{
      this.radarChartLabels = data['labels']
      this.radarChartData = data['data']
      if(this.contador <2 ){
        this.contador = this.contador +1
      }
    })
  }

}
