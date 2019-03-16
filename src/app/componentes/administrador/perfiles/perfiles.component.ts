import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Alumno} from '../../../modelos/alumno.model';
import {ALUMNO_DATA} from '../../../modelos/alumno.model';
import {Profesor} from '../../../modelos/profesor';
import {PROFESOR_DATA} from '../../../modelos/profesor';
import {Apoderado} from '../../../modelos/apoderado';
import {APODERADO_DATA} from '../../../modelos/apoderado';
import {AlumnoService} from '../../../servicios/alumno.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})

export class PerfilesComponent implements OnInit {
  alumno_editar: Alumno;
  profesor_editar: Profesor;
  alumnos: Alumno[];
  profesores: Profesor[];


  registerProfesorForm: FormGroup;
  submitted = false;



  displayedColumnsAlumno: string[] = ['imagen','rut','nombres','apellido_paterno','apellido_materno','curso','telefono','puntaje_ingreso','accion'];
  displayedColumnsProfesor: string[] = ['imagen','rut','nombres','apellido_paterno','apellido_materno','asignatura','telefono','accion']
  displayedColumnsApoderado: string[] = ['imagen','rut','nombres', 'apellido_paterno','apellido_materno','direccion','telefono','accion']
  
  dataSourceProfesor = new MatTableDataSource<Profesor>(PROFESOR_DATA);
  dataSourceApoderado = new MatTableDataSource<Apoderado>(APODERADO_DATA);

  profesor_perfil: Profesor;
  alumno_perfil: Alumno;
  apoderado_perfil: Apoderado;
  perfil_editar: string;
  evento:string
  @Output() 
  hojaVida = new EventEmitter<string>()
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alumnoService: AlumnoService, private formBuilder: FormBuilder) { }



  dataSourceAlumno :MatTableDataSource<Alumno>;
  ngOnInit() {
    this.dataSourceProfesor.paginator = this.paginator;
    this.dataSourceApoderado.paginator = this.paginator;
    this.getAlumnos();
    this.registerProfesorForm = this.formBuilder.group({
      nombre_profesor:['', Validators.required],
      apellido_paterno_profesor:['', Validators.required],
      apellido_materno_profesor:['', Validators.required],
      nombre_usuario_profesor:['', Validators.required],
      direccion_profesor:['', Validators.required],
    },
    {

    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceAlumno.filter = filterValue;
    this.dataSourceProfesor.filter = filterValue;
    this.dataSourceApoderado.filter = filterValue;
  }

  public postProfesor(){

    console.log(this.registerProfesorForm.value)
  }

  public getAlumnos(){
  	this.alumnoService.getAlumno().subscribe((data: Array<Alumno>) => {
      this.alumnos = data;
      this.dataSourceAlumno= new MatTableDataSource<any>(data);
      this.dataSourceAlumno.paginator = this.paginator;
  	});
  }
  public verHojaVida(id:string):void{
    this.evento=id
    console.log(this.evento)
    this.hojaVida.emit(this.evento)
  }

  public editarPerfil(tipo:string,id:number):void{
    this.perfil_editar=tipo
    if(tipo=="profesor"){
      for(let profesor of PROFESOR_DATA){
        if(profesor.id == id){
          this.profesor_perfil=profesor;
        }
      }
    }
    if(tipo=="alumno"){
      for(let alumno of ALUMNO_DATA){
        if(alumno.id == id){
          this.alumno_perfil=alumno;
        }
      }
    }
    if(tipo=="apoderado"){
      for(let apoderado of APODERADO_DATA){
        if(apoderado.id == id){
          this.apoderado_perfil=apoderado;
        }
      }
    }
  }
}
