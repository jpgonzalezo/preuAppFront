import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Profesor{

}

export interface Apoderador{

}

export interface Alumno{
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  colegio: string;
  curso: string;
  apoderado: string;
  email: string;
  password: string
  telefono: number;
  direccion: string;
  rut: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  sexo: string;
  puntaje_ingreso: number;
}

const ALUMNO_DATA: Alumno[] = [
  {
    nombres: "Pedro Antonio", 
    apellido_paterno: "Figueroa" ,  
    apellido_materno: "Sanchez",
    colegio: "Colegio Bicentenario",
    curso: "Historia",
    apoderado: "Alvaro Figueroa",
    email: "pedro_antonio@gmail.com",
    password: "1234",
    telefono: 978767182,
    direccion: "Calle 123, San Bdo",
    rut: "20.052.789-2",
    fecha_ingreso: "19/03/19",
    fecha_nacimiento: "13/04/98",
    sexo: "Masculino",
    puntaje_ingreso: 670
  },
  {
    nombres: "Pedro Antonio", 
    apellido_paterno: "Figueroa" ,  
    apellido_materno: "Sanchez",
    colegio: "Colegio Bicentenario",
    curso: "Historia",
    apoderado: "Alvaro Figueroa",
    email: "pedro_antonio@gmail.com",
    password: "1234",
    telefono: 978767182,
    direccion: "Calle 123, San Bdo",
    rut: "20.052.789-2",
    fecha_ingreso: "19/03/19",
    fecha_nacimiento: "13/04/98",
    sexo: "Masculino",
    puntaje_ingreso: 670
  },
  {
    nombres: "Pedro Antonio", 
    apellido_paterno: "Figueroa" ,  
    apellido_materno: "Sanchez",
    colegio: "Colegio Bicentenario",
    curso: "Historia",
    apoderado: "Alvaro Figueroa",
    email: "pedro_antonio@gmail.com",
    password: "1234",
    telefono: 978767182,
    direccion: "Calle 123, San Bdo",
    rut: "20.052.789-2",
    fecha_ingreso: "19/03/19",
    fecha_nacimiento: "13/04/98",
    sexo: "Masculino",
    puntaje_ingreso: 670
  },
  {
    nombres: "Pedro Antonio", 
    apellido_paterno: "Figueroa" ,  
    apellido_materno: "Sanchez",
    colegio: "Colegio Bicentenario",
    curso: "Historia",
    apoderado: "Alvaro Figueroa",
    email: "pedro_antonio@gmail.com",
    password: "1234",
    telefono: 978767182,
    direccion: "Calle 123, San Bdo",
    rut: "20.052.789-2",
    fecha_ingreso: "19/03/19",
    fecha_nacimiento: "13/04/98",
    sexo: "Masculino",
    puntaje_ingreso: 670
  },
  {
    nombres: "Pedro Antonio", 
    apellido_paterno: "Figueroa" ,  
    apellido_materno: "Sanchez",
    colegio: "Colegio Bicentenario",
    curso: "Historia",
    apoderado: "Alvaro Figueroa",
    email: "pedro_antonio@gmail.com",
    password: "1234",
    telefono: 978767182,
    direccion: "Calle 123, San Bdo",
    rut: "20.052.789-2",
    fecha_ingreso: "19/03/19",
    fecha_nacimiento: "13/04/98",
    sexo: "Masculino",
    puntaje_ingreso: 670
  },
  {
    nombres: "Pedro Antonio", 
    apellido_paterno: "Figueroa" ,  
    apellido_materno: "Sanchez",
    colegio: "Colegio Bicentenario",
    curso: "Ciencias",
    apoderado: "Alvaro Figueroa",
    email: "pedro_antonio@gmail.com",
    password: "1234",
    telefono: 978767182,
    direccion: "Calle 123, San Bdo",
    rut: "20.052.789-2",
    fecha_ingreso: "19/03/19",
    fecha_nacimiento: "13/04/98",
    sexo: "Masculino",
    puntaje_ingreso: 670
  },
];

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})

export class PerfilesComponent implements OnInit {
  displayedColumns: string[] = [
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

  dataSourceAlumno = new MatTableDataSource<Alumno>(ALUMNO_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSourceAlumno.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceAlumno.filter = filterValue;
  }
}
