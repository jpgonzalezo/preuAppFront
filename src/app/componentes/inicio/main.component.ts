import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  routes:Object[]=[
    {tittle:"Regiones", route: "/regiones", icon:"dashboard"},
    {tittle:"Ciudades", route: "/ciudades", icon:"dashboard"},
  ]
  constructor() { }

  ngOnInit() {
  }

}
