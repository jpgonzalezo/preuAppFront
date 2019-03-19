import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario:string;
  password:string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login():void{
    console.log("cambia ruta")
    this.router.navigateByUrl('/profesor');
  }

}
