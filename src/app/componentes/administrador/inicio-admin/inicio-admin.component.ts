import { Component, OnInit , Input} from '@angular/core';
import { Router} from '@angular/router'
import {Location} from '@angular/common'

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  ventanaActiva:string;
  tipo_nuevo_perfil: string;
  id_hoja_vida: string;
  constructor(private router:Router, private location:Location){
    this.ventanaActiva = 'home';
  }

  ngOnInit() {

  }

  public cambiarVentanaActiva(opcion:string){
    this.ventanaActiva = opcion;
  }

  public redireccionEvento(event:any){
    this.cambiarVentanaActiva(event.vista)
    this.tipo_nuevo_perfil = event.tipo
  }

  public verHojaVida(event:any){
    this.cambiarVentanaActiva('hoja_vida');
    this.id_hoja_vida = event;
  }


}
