import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {AlumnoService} from '../../../servicios/alumno.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  alumnos:any=[];
  profesores:any=[];

  @Output()
  nuevo_perfil = new EventEmitter<any>();

  @Output()
  hoja_vida = new EventEmitter<any>();

  constructor(private _alumnoService: AlumnoService, private formBuilder: FormBuilder) { 
    this.page = 1;
    this.pageSizeAlumno = 4;
    this.pageSizeProfesor = 4;
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
  	this._alumnoService.getAlumno().subscribe((data: Array<any>) => {
      this.alumnos = data;
      this.collectionSizeAlumno = this.alumnos.length;
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
    this.nuevo_perfil.emit({vista : "nuevo_perfil", tipo : tipo_perfil});
  }

  generarVistaHojaVida(id:string){
    this.hoja_vida.emit(id);
  }

}
