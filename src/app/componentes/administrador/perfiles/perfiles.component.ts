import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { AdministradorCompartidoService } from 'src/app/componentes/administrador/administrador.compartido.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})

export class PerfilesComponent implements OnInit {
  pageAlumno: number;
  pageSizeAlumno: number;
  collectionSizeAlumno: number;
  pageProfesor: number;
  pageSizeProfesor: number;
  collectionSizeProfesor: number;
  alumnos:any;
  profesores:any;

  constructor(private _alumnoService: AlumnoService, 
              private formBuilder: FormBuilder,
              private _cursoService: CursoService,
              private _administradorCompartidoService: AdministradorCompartidoService,
              private router: Router,
              private _profesorService: ProfesorService,
              private _asignaturaService: AsignaturaService
    )
  { 
    this.pageAlumno = 1;
    this.pageProfesor = 1;
    this.pageSizeAlumno = 4;
    this.pageSizeProfesor = 4;
    this.alumnos=[];
    this.profesores = [];
  }

  ngOnInit() {
    this.getAlumnos();
    this.getProfesores();
  }

  get alumnos_tabla(): any[] {
    return this.alumnos
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumno - 1) * this.pageSizeAlumno, (this.pageAlumno - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
  }

  get profesores_tabla(): any[] {
    return this.profesores
      .map((profesor, i) => ({id: i + 1, ...profesor}))
      .slice((this.pageProfesor - 1) * this.pageSizeProfesor, (this.pageProfesor - 1) * this.pageSizeProfesor + this.pageSizeProfesor);
  }

  public getAlumnos(){
  	this._alumnoService.getAlumno().subscribe((data:any) => {
      this.alumnos = data;
      this.collectionSizeAlumno = this.alumnos.length;
      for(let alumno of this.alumnos){
        if(alumno.curso != null){
          this._cursoService.getCurso(alumno.curso).subscribe((curso:any)=>{
            alumno.curso = curso.nombre;
          })
        }
      } 
    });
  }

  public getProfesores(){
    this._profesorService.getProfesores().subscribe((data:any)=>{
      this.profesores = data;
      this.collectionSizeProfesor = this.profesores.length;
      for(let profesor of this.profesores){
        if(profesor.asignatura != null){
          this._asignaturaService.getAsignatura(profesor.asignatura).subscribe((asignatura:any)=>{
            profesor.asignatura = asignatura.nombre;
          })
        }
      }
    })
  }

  public deleteAlumno(id:string){
    swal.fire({
      title: 'Desea borrar este perfil?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5e72e4',
      cancelButtonColor: '#f5365c',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this._alumnoService.deleteAlumno(id).subscribe((data:any)=>{
          if(data['Response']=='borrado'){
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado registro exitosamente.',
              type:'success'
            }).then((result)=>{
              if(result.value){
                this.getAlumnos();
              }
              if(result.dismiss){
                this.getAlumnos();
              }
            })
          }
        })
      }

    })
  }

  public deleteProfesor(id:string){
    swal.fire({
      title: 'Desea borrar este perfil?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5e72e4',
      cancelButtonColor: '#f5365c',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this._profesorService.deleteProfesor(id).subscribe((data:any)=>{
          if(data['Response']=='borrado'){
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado registro exitosamente.',
              type:'success'
            }).then((result)=>{
              if(result.value){
                this.getProfesores();
              }
              if(result.dismiss){
                this.getProfesores();
              }
            })
          }
        })
      }

    })
  }

  public generarVistaNuevoPerfil(tipo_perfil:string){
    this.router.navigateByUrl('/admin/perfiles/nuevo_perfil/'+tipo_perfil);
  }

  generarVistaHojaVida(id:string){
    this.router.navigateByUrl('/admin/perfiles/hoja_vida/'+id);
  }

}
