import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  ventanaActiva:string='1';
  constructor() { }

  ngOnInit() {

  }

  public cambiarRuta(opcion:string):void{
    this.ventanaActiva=opcion;
    console.log("ocultar navbar");
    $('#navbarContent').hide();
  }

  public mostrarNavbar():void{
    console.log("mostrarNavbar")
    $('#navbarContent').show();
  }

}
