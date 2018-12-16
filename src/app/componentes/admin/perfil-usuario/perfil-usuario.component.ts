import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html'
})
export class PerfilUsuarioComponent implements OnInit {
  @Input() editar:boolean;
  @Input() alumnoEditar:Alumno;
  @Output() guardar=new EventEmitter();
  
  constructor() {}
  ngOnInit() {}

  guardarUsuario():void{
    this.guardar.emit(false);
  }
}
