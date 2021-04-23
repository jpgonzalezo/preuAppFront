import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//SERVICIOS
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { AlumnoTablaService } from 'src/app/servicios/tablas/tabla.perfiles.alumnos.service';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
//MODELOS
import { Colegio } from 'src/app/modelos/colegio.model';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Curso } from 'src/app/modelos/curso.model';
import { Profesor } from 'src/app/modelos/profesor';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Apoderado } from 'src/app/modelos/apoderado.model';
import { Administrador } from 'src/app/modelos/administrador.model';
import swal from'sweetalert2';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html'
})

export class PerfilesComponent implements OnInit {
  colegios: Colegio[];
  cursos: Curso[];
  asignaturas: Asignatura[];
  alumnos: Alumno[]
  profesores: Profesor[]
  apoderados: Apoderado[]
  administradores: Administrador[]
  totalAlumnos$: Observable<number>;
  token: string
  pageProfesor: number;
  pageSizeProfesor: number;
  collectionSizeProfesor: number;
  pageAdministrador: number;
  pageSizeAdministrador: number;
  collectionSizeAdministrador: number;
  pageAlumno: number;
  pageSizeAlumno: number;
  collectionSizeAlumno: number;
  pageApoderado: number;
  pageSizeApoderado: number;
  collectionSizeApoderado: number;
  loading:boolean = false
  loadalumno:boolean = false
  loadapoderado:boolean = false
  loadprofesor:boolean = false
  loadadministrador:boolean = false
  constructor(
    private _alumnoService: AlumnoService,
    private router: Router,
    private _profesorService: ProfesorService,
    private _apoderadoService: ApoderadoService,
    private _administradorService: AdministradorService,
    public _alumnoTablaService: AlumnoTablaService,
    private _localService: LocalService,
    private _storageService: StorageService,
    )
  { 
    this.asignaturas= []
    this.cursos = []
    this.colegios = []
    this.alumnos = []
    this.profesores = []
    this.administradores = []
    this.pageProfesor = 1
    this.pageSizeProfesor = 10
    this.pageAdministrador = 1
    this.pageSizeAdministrador = 10
    this.pageAlumno = 1
    this.pageSizeAlumno = 10
    this.pageApoderado = 1
    this.pageSizeApoderado = 10
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getApoderados()
    this.getAlumnos()
    this.getProfesores()
    this.getAdministradores()
  }

  get profesores_tabla(): any[] {
    return this.profesores
      .map((profesor, i) => ({id: i + 1, ...profesor}))
      .slice((this.pageProfesor - 1) * this.pageSizeProfesor, (this.pageProfesor - 1) * this.pageSizeProfesor + this.pageSizeProfesor);
  }

  get administradores_tabla(): any[] {
    return this.administradores
      .map((administrador, i) => ({id: i + 1, ...administrador}))
      .slice((this.pageAdministrador - 1) * this.pageSizeAdministrador, (this.pageAdministrador - 1) * this.pageSizeAdministrador + this.pageSizeAdministrador);
  }

  get alumnos_tabla(): any[] {
    return this.alumnos
      .map((asignatura, i) => ({id: i + 1, ...asignatura}))
      .slice((this.pageAlumno - 1) * this.pageSizeAlumno, (this.pageAlumno - 1) * this.pageSizeAlumno + this.pageSizeAlumno);
  }

  get apoderados_tabla(): any[] {
    return this.apoderados
      .map((apoderado, i) => ({id: i + 1, ...apoderado}))
      .slice((this.pageApoderado - 1) * this.pageSizeApoderado, (this.pageApoderado - 1) * this.pageSizeApoderado + this.pageSizeApoderado);
  }

  public deleteAlumno(id:string){
    swal.fire({
      title: 'Desea borrar este perfil?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.loading = true
        this._alumnoService.deleteAlumno(id,this.token).subscribe((data:any)=>{
          if(data['Response']=='borrado'){
            this.loading = false
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado registro exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this._alumnoTablaService.getAlumnos()
            })
          }
        })
        this.loading = false
      }
    })
  }

  public deleteProfesor(id:string){
    swal.fire({
      title: 'Desea borrar este perfil?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.loading = true
        this._profesorService.deleteProfesor(id,this.token).subscribe((data:any)=>{
          this.loading = false
          if(data['Response']=='borrado'){
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado registro exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
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
        this.loading = false
      }

    })
  }

  public deleteApoderado(id:string){
    swal.fire({
      title: 'Desea borrar este perfil?',
      text: "Usted no podrá revertir los cambios!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.loading = true
        this._apoderadoService.deleteApoderado(id,this.token).subscribe((data:any)=>{
          this.loading = false
          if(data['Response']=='borrado'){
            swal.fire({
              title:'Borrado!',
              text:'Se ha borrado registro exitosamente.',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.getApoderados();
            })
          }
        })
        this.loading = false
      }

    })
  }

  public getAlumnos(){
    this.loadalumno = true
    this._alumnoService.getAlumno(this.token).subscribe((data:Alumno[])=>{
      this.alumnos = data
      for(let alumno of this.alumnos){
        if(alumno.imagen==''){
          alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/default"
        }
        else{
          alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
        }
      }
      this.collectionSizeAlumno = this.alumnos.length
      this.loadalumno = false
    })
  }

  public getProfesores(){
    this.loadprofesor = true
    this._profesorService.getProfesores(this.token).subscribe((data:Profesor[])=>{
      this.profesores = data
      for(let profesor of this.profesores){
        if(profesor.imagen==''){
          profesor.imagen = Config.API_SERVER_URL+"/profesor_imagen/default"
        }
        else{
          profesor.imagen = Config.API_SERVER_URL+"/profesor_imagen/"+profesor.imagen
        }
      }
      this.collectionSizeProfesor = this.profesores.length
      this.loadprofesor = false
    })
  }

  public getAdministradores(){
    this.loadadministrador = true
    this._administradorService.getAdministradores(this.token).subscribe((data:Administrador[])=>{
      this.administradores = data
      for(let administrador of this.administradores){
        if(administrador.imagen==''){
          administrador.imagen = Config.API_SERVER_URL+"/administrador_imagen/default"
        }
        else{
          administrador.imagen = Config.API_SERVER_URL+"/administrador_imagen/"+administrador.imagen
        }
      }
      this.collectionSizeAdministrador = this.administradores.length
      this.loadadministrador = false
    })
  }

  public getApoderados(){
    this.loadapoderado  = true
    this._apoderadoService.getApoderados(this.token).subscribe((data:Apoderado[])=>{
      this.apoderados = data
      for(let apoderado of this.apoderados){
        if(apoderado.imagen==''){
          apoderado.imagen = Config.API_SERVER_URL+"/apoderado_imagen/default"
        }
        else{
          apoderado.imagen = Config.API_SERVER_URL+"/apoderado_imagen/"+apoderado.imagen
        }
      }
      this.collectionSizeApoderado = this.apoderados.length
      this.loadapoderado = false
    })
  }

  generarVistaHojaVida(id:string){
    this.router.navigateByUrl('/admin/perfiles/hoja_vida/'+id);
  }

  verDetalleProfesor(id:string){
    this.router.navigateByUrl('/admin/perfiles/detalle_profesor/'+id);
  }

  generarNuevoAlumno(){
    this.router.navigateByUrl('/admin/perfiles/nuevoAlumno');
  }

  generarNuevoProfesor(){
    this.router.navigateByUrl('/admin/perfiles/nuevoProfesor');
  }


  generarNuevoApoderado(){
    this.router.navigateByUrl('/admin/perfiles/nuevoApoderado');
  }

  generarNuevoAdministrador(){
    this.router.navigateByUrl('/admin/perfiles/nuevoAdministrador');
  }

  editarAlumno(id_alumno:string){
    this.router.navigateByUrl('/admin/perfiles/editarAlumno/'+id_alumno);
  }

  editarProfesor(id_profesor:string){
    this.router.navigateByUrl('/admin/perfiles/editarProfesor/'+id_profesor);
  }

  editarApoderado(id_apoderado:string){
    this.router.navigateByUrl('/admin/perfiles/editarApoderado/'+id_apoderado);
  }

  editarAdministrador(id_administrador:string){
    this.router.navigateByUrl('/admin/perfiles/editarAdministrador/'+id_administrador);
  }
  
}
