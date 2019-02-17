import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Alumno,ALUMNO_DATA} from '../../../modelos/alumno';
import {Anotacion, ANOTACION_DATA} from '../../../modelos/anotacion'
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  @Input()
  id_alumno:number;
  @Output() 
  redireccion = new EventEmitter<string>()

  Alumnos: Alumno[] = ALUMNO_DATA;
  alumno: Alumno;
  displayedColumnsAnotacion: string[] = [
    'titulo',
    'profesor',
    'fecha', 
    'detalle',
  ];
  dataSourceAnotacion = new MatTableDataSource<Anotacion>(ANOTACION_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.seleccionAlumno(this.id_alumno);
    this.dataSourceAnotacion.paginator = this.paginator;
  }

  public seleccionAlumno(id_alumno:number):void{
    for (let alumno of this.Alumnos){
      if(alumno.id == id_alumno){
        this.alumno = alumno
      }
    }
  }
  public redireccionarAtras():void{
    this.redireccion.emit("perfiles")
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceAnotacion.filter = filterValue;
  }
}
