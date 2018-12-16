import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html'
})
export class MenuAdminComponent implements OnInit {
  vistaActiva=1;
  constructor() { }
  cambiarVistaActiva(opcion:number):void{
    console.log(opcion);
  }
  ngOnInit() {
    
  }

}
