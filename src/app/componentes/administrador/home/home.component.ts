import { Component, OnInit } from '@angular/core';
import {EstadisticaService} from '../../../servicios/estadistica.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data:any=[]
  public barChartData:any[] = [
    {data: [100,0,0,100,0,0,0,0,0,0,0,0], label: 'asignatura1'}
  ];
  constructor(public _estadisticaService: EstadisticaService) {
  }

  ngOnInit() {
    this.get_estadistica()
  }

  get_estadistica(){
    this._estadisticaService.getEstadisticaResumen().subscribe((data: any) => (
      this.data = data)
    );
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };


  public barChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 

 
  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }
 
  public chartHovered(e:any):void {
    //console.log(e);
  }

  // Radar
  public radarChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Asistencia'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Inasistencia'}
  ];
  public radarChartType:string = 'radar';

}
