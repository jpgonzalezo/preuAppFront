import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface Profesor{
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
  telefono: string;
  rut: string;
  direccion: string;
  asignatura: string;
}

export interface Apoderado{
 nombres: string;
 apellido_paterno:string;
 apellido_materno: string;
 email: string;
 telefono:string;
 direccion: string;
 rut: string;
 password: string;
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

const PROFESOR_DATA: Profesor[]=[
  {
    nombres: "Juan Pablo",
    apellido_paterno: "Gonzalez",
    apellido_materno: "Opazo",
    email: "jpgonzalez@gmail.com",
    password: "123",
    telefono: "+56974459133",
    rut: "18.883.307-1",
    direccion: "cale 234, Sn Bdo",
    asignatura: "Matemáticas",
  },
  {
    nombres: "Juan Pablo",
    apellido_paterno: "Gonzalez",
    apellido_materno: "Opazo",
    email: "jpgonzalez@gmail.com",
    password: "123",
    telefono: "+56974459133",
    rut: "18.883.307-1",
    direccion: "cale 234, Sn Bdo",
    asignatura: "Matemáticas",
  },
  {
    nombres: "Juan Pablo",
    apellido_paterno: "Gonzalez",
    apellido_materno: "Opazo",
    email: "jpgonzalez@gmail.com",
    password: "123",
    telefono: "+56974459133",
    rut: "18.883.307-1",
    direccion: "cale 234, Sn Bdo",
    asignatura: "Matemáticas",
  },
  {
    nombres: "Juan Pablo",
    apellido_paterno: "Gonzalez",
    apellido_materno: "Opazo",
    email: "jpgonzalez@gmail.com",
    password: "123",
    telefono: "+56974459133",
    rut: "18.883.307-1",
    direccion: "cale 234, Sn Bdo",
    asignatura: "Matemáticas",
  },
  {
    nombres: "Juan Pablo",
    apellido_paterno: "Gonzalez",
    apellido_materno: "Opazo",
    email: "jpgonzalez@gmail.com",
    password: "123",
    telefono: "+56974459133",
    rut: "18.883.307-1",
    direccion: "cale 234, Sn Bdo",
    asignatura: "Matemáticas",
  },
  {
    nombres: "Juan Pablo",
    apellido_paterno: "Gonzalez",
    apellido_materno: "Opazo",
    email: "jpgonzalez@gmail.com",
    password: "123",
    telefono: "+56974459133",
    rut: "18.883.307-1",
    direccion: "cale 234, Sn Bdo",
    asignatura: "Matemáticas",
  },
]

const APODERADO_DATA: Apoderado[] = [
  {
    nombres: "Alvaro",
    apellido_paterno:"Alvarez",
    apellido_materno: "Sanchez",
    email: "jorge.sancehz@gmail.com",
    telefono: "+56975747185",
    direccion: "calle 456, Sn Bdo",
    rut: "9.993.456-7",
    password: "1234",
  },
  {
    nombres: "Jorge",
    apellido_paterno:"Alvarez",
    apellido_materno: "Sanchez",
    email: "jorge.sancehz@gmail.com",
    telefono: "+56975747185",
    direccion: "calle 456, Sn Bdo",
    rut: "9.993.456-7",
    password: "1234",
  },
  {
    nombres: "Jorge",
    apellido_paterno:"Alvarez",
    apellido_materno: "Sanchez",
    email: "jorge.sancehz@gmail.com",
    telefono: "+56975747185",
    direccion: "calle 456, Sn Bdo",
    rut: "9.993.456-7",
    password: "1234",
  },
  {
    nombres: "Jorge",
    apellido_paterno:"Alvarez",
    apellido_materno: "Sanchez",
    email: "jorge.sancehz@gmail.com",
    telefono: "+56975747185",
    direccion: "calle 456, Sn Bdo",
    rut: "9.993.456-7",
    password: "1234",
  },
  {
    nombres: "Jorge",
    apellido_paterno:"Alvarez",
    apellido_materno: "Sanchez",
    email: "jorge.sancehz@gmail.com",
    telefono: "+56975747185",
    direccion: "calle 456, Sn Bdo",
    rut: "9.993.456-7",
    password: "1234",
  },
]

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
}
