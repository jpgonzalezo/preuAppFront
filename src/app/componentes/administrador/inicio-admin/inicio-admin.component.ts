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
  hojaAlumno:string;
  constructor() { }

  ngOnInit() {

  }

  public cambiarRuta(opcion:string):void{
    this.ventanaActiva=opcion;
    $('#navbarContent').hide();
  }

  public volver(opcion:string):void{
    if(opcion=="perfiles"){
      this.ventanaActiva='2'
    }
  }

  public mostrarNavbar():void{
    $('#navbarContent').show();
  }

  public cargarHojaVida(mensaje){
    this.hojaAlumno = mensaje
    this.ventanaActiva='7'
  }

}
