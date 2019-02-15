import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  ventanaActiva:string='1'
  constructor() { }

  ngOnInit() {

  }

  public cambiarRuta(opcion:string):void{
    this.ventanaActiva=opcion
    console.log(this.ventanaActiva)
  }

}
