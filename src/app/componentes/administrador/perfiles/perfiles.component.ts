import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Alumno} from '../../../modelos/alumno';
import {ALUMNO_DATA} from '../../../modelos/alumno';
import {Profesor} from '../../../modelos/profesor';
import {PROFESOR_DATA} from '../../../modelos/profesor';
import {Apoderado} from '../../../modelos/apoderado';
import {APODERADO_DATA} from '../../../modelos/apoderado';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})

export class PerfilesComponent implements OnInit {
  displayedColumnsAlumno: string[] = [
    'imagen',
    'rut',
    'nombres', 
    'apellido_paterno',
    'apellido_materno',
    'curso',
    'telefono',
    'puntaje_ingreso',
    'accion'
  ];

  displayedColumnsProfesor: string[] = [
    'imagen',
    'rut',
    'nombres', 
    'apellido_paterno',
    'apellido_materno',
    'asignatura',
    'telefono',
    'accion'
  ]

  displayedColumnsApoderado: string[] = [
    'imagen',
    'rut',
    'nombres', 
    'apellido_paterno',
    'apellido_materno',
    'direccion',
    'telefono',
    'accion'
  ]

  dataSourceAlumno = new MatTableDataSource<Alumno>(ALUMNO_DATA);
  dataSourceProfesor = new MatTableDataSource<Profesor>(PROFESOR_DATA);
  dataSourceApoderado = new MatTableDataSource<Apoderado>(APODERADO_DATA);

  @Output() 
  hojaVida = new EventEmitter<string>()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  evento:string
  

  constructor() { }

  ngOnInit() {
    this.dataSourceAlumno.paginator = this.paginator;
    this.dataSourceProfesor.paginator = this.paginator;
    this.dataSourceApoderado.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceAlumno.filter = filterValue;
    this.dataSourceProfesor.filter = filterValue;
    this.dataSourceApoderado.filter = filterValue;
  }

  public verHojaVida(id:string):void{
    this.evento=id
    console.log(this.evento)
    this.hojaVida.emit(this.evento)
  }
}
