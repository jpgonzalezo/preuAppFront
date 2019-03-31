import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {AlumnoService} from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
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
  page: number;
  pageSizeAlumno: number;
  collectionSizeAlumno: number;
  pageSizeProfesor: number;
  collectionSizeProfesor: number;
  alumnos:any;
  profesores:any=[];

  constructor(private _alumnoService: AlumnoService, 
              private formBuilder: FormBuilder,
              private _cursoService: CursoService,
              private _administradorCompartidoService: AdministradorCompartidoService,
              private router: Router) { 
    this.page = 1;
    this.pageSizeAlumno = 4;
    this.pageSizeProfesor = 4;
    this.alumnos=[];
  }

  ngOnInit() {
    this.getAlumnos();
  }

  get alumnos_tabla(): any[] {
    return this.alumnos
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.page - 1) * this.pageSizeAlumno, (this.page - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
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
