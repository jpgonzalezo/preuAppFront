import { Component, OnInit } from '@angular/core';
import {Alumno} from '../../../modelos/alumno';
import {Profesor} from '../../../modelos/profesor';
import {AlumnoService} from '../../../servicios/alumno.service';


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {
  perfilActivo:number=1;
  alumnos: Alumno[];
  profesores: Profesor[]=[
    {rut: "20590809-7", nombres:"Rodrigo Esteban" ,apellidos:"Donoso Soto" ,curso:"Lenguaje",telefono:"99887744",email:"ejemplo@gmail.com"},
    {rut: "20590809-8", nombres:"Sergio Andres" ,apellidos:"Soto Palominos" ,curso:"Ciencia",telefono:"99887744",email:"ejemplo@gmail.com"},
    {rut: "20590809-9", nombres:"Bastian Alonso" ,apellidos:"Piña Vasquez" ,curso:"Hisotria",telefono:"99887744",email:"ejemplo@gmail.com"},
    {rut: "20590809-2", nombres:"Juan Pablo" ,apellidos:"Gonzalez Opazo" ,curso:"Matematicas",telefono:"99887744",email:"ejemplo@gmail.com"}
  ]
  editar: boolean=false;
  alumnoEditar: Alumno=new Alumno();
  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnos= this.alumnoService.getAlumnos();
  }

  ActualizarLista(ev): void {
    this.editar=ev;
  }

  editarPerfil(alumno: Alumno):void{
    this.editar=true;
    this.alumnoEditar=alumno;
  }
}
