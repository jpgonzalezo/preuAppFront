import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';

  public barChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [650, 590, 800, 810, 560, 550, 850], label: 'Lenguaje'},
    {data: [280, 800, 652, 654, 710, 750, 850], label: 'Matematicas'},
    {data: [280, 480, 409, 520, 550, 270, 850], label: 'Fisica'},
    {data: [280, 785, 750, 630, 520, 650, 850], label: 'Quimica'},
    {data: [280, 480, 400, 550, 630, 720, 850], label: 'Biologia'},
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  // Radar
  public radarChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Asistencia'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Inasistencia'}
  ];
  public radarChartType:string = 'radar';

}
