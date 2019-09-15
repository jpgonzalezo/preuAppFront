import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//SERVICIOS
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
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
  constructor(
    private _alumnoService: AlumnoService,
    private _cursoService: CursoService,
    private router: Router,
    private _profesorService: ProfesorService,
    private _asignaturaService: AsignaturaService,
    private _colegioService: ColegioService,
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
    this.getCursos()
    this.getColegios()
    this.getAsignaturas()
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
    this.loading = true
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
      this.loading = false
    })
  }

  public getProfesores(){
    this.loading = true
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
      this.loading = false
    })
  }

  public getAdministradores(){
    this.loading = true
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
      this.loading = false
    })
  }

  public getApoderados(){
    this.loading  = true
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
      this.loading = false
    })
  }
  public getColegios(){
    this.loading = true
    this._colegioService.getColegios(this.token).subscribe((colegios: Array<Colegio>)=>{
      this.colegios = colegios
      this.loading = false
    })
  }

  public getCursos(){
    this.loading = true
    this._cursoService.getCursos(this.token).subscribe((cursos: Array<Curso>)=>{
      this.cursos = cursos
      this.loading = false
    })
  }

  public getAsignaturas(){
    this.loading = true
    this._asignaturaService.getAsignaturas(this.token).subscribe((asignaturas: Asignatura[])=>{
      this.asignaturas = asignaturas
      this.loading = false
    })
  }

  public nuevo_estudiante(){
    var cursos = {}
    var colegios = {}

    for(let curso of this.cursos){
      cursos[curso.id] = curso.nombre
    }

    for(let colegio of this.colegios){
      colegios[colegio.id] = colegio.nombre
    }

    swal.mixin({
      title: 'Nuevo Estudiante',
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4','5'],
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
    }).queue([
      {
        title: 'Datos Personales 1',
        preConfirm: function () {
          return {
            'rut': $('#swal-input0').val(),
            'nombres': $('#swal-input1').val(),
            'apellido_paterno': $('#swal-input2').val(),
            'apellido_materno':  $('#swal-input3').val(),
            'puntaje_ingreso':  $('#swal-input9').val()
          }
        },
        html:
          '<label>Rut</label>'+
          '<input id="swal-input0" class="swal2-input placeholders="rut" value ="">' +
          '<label>Nombres</label>'+
          '<input id="swal-input1" class="swal2-input placeholders="nombres" value ="">' +
          '<label>Apellido Paterno</label>'+
          '<input id="swal-input2" class="swal2-input placeholders="apellido_paterno" value="">'+
          '<label>Apellido Materno</label>'+
          '<input id="swal-input3" class="swal2-input placeholders="apellido_materno" value="">'+
          '<label>Puntaje de Ingreso</label>'+'<br>'+
          '<input type ="number" id="swal-input9" class="swal2-input placeholders="puntaje ingreso" value ="">'
      },
      {
        title: 'Datos personales 2',
        text: 'Seleccione el sexo del estudiante',
        input: 'select',
        inputOptions: {
          'MASCULINO': 'Masculino',
          'FEMENINO': 'Femenino',
          'NO DEFINIDO': 'No Definido'
        },
        inputPlaceholder: 'Seleccione sexo',
      },
      {
        title: 'Datos Contacto 1',
        preConfirm: function () {
          return {
              'email':$('#swal-input4').val(),
              'telefono':$('#swal-input5').val(),
              'direccion':$('#swal-input6').val(),
              'numero':$('#swal-input7').val(),
              'comuna':$('#swal-input8').val(),
          }
        },
        html:
          '<label>Email</label>'+
          '<input type="email" id="swal-input4" class="swal2-input placeholders="email" value ="">' +
          '<label>Telefono</label>'+
          '<input id="swal-input5" class="swal2-input placeholders="telefono" value ="">'+
          '<label>Calle</label>'+
          '<input id="swal-input6" class="swal2-input placeholders="calle" value ="">' +
          '<label>Número</label>'+
          '<input id="swal-input7" class="swal2-input placeholders="numero" value ="">'+
          '<label>Comuna</label>'+
          '<input id="swal-input8" class="swal2-input placeholders="comuna" value ="">'
      },
      {
        title: 'Datos Académicos 2',
        text: 'Seleccione curso del alumno',
        input: 'select',
        inputOptions: cursos,
        inputPlaceholder: 'Cursos Preuniversitario',
      },
      {
        title: 'Datos Académicos 3',
        text: 'Seleccione colegio del alumno',
        input: 'select',
        inputOptions: colegios,
        inputPlaceholder: 'Colegios Preuniversitario',
      }
    ]).then((result1)=> {
      if(result1.value){
        if(
          result1.value[0].nombres=="" ||
          result1.value[0].apellido_paterno=="" ||
          result1.value[0].apellido_materno=="" ||
          result1.value[0].rut=="" ||
          result1.value[0].puntaje_ingreso=="" ||
          result1.value[1]==""||
          result1.value[2].telefono=="" ||
          result1.value[2].email=="" ||
          result1.value[2].direccion=="" ||
          result1.value[2].numero=="" ||
          result1.value[2].comuna=="" ||
          result1.value[3]=="" ||
          result1.value[4]==""
          )
        {
          swal.fire({
            type: 'error',
            title: 'Error en el Registro',
            text: 'Debe completar todos los campos para crear un estudiante',
            confirmButtonColor: '#2dce89',
            confirmButtonText: 'Aceptar'
          }).then((result)=>{
            this.nuevo_estudiante()
          })
        }
        else{
            const data={
              "nombres" : result1.value[0].nombres,
              "apellido_paterno":result1.value[0].apellido_paterno,
              "apellido_materno":result1.value[0].apellido_materno,
              "rut":result1.value[0].rut,
              "puntaje_ingreso":result1.value[0].puntaje_ingreso,
              "sexo":result1.value[1],
              "telefono":result1.value[2].telefono,
              "email":result1.value[2].email,
              "calle":result1.value[2].direccion,
              "numero":result1.value[2].numero,
              "comuna":result1.value[2].comuna,
              "curso":result1.value[3],
              "colegio":result1.value[4],
          }
          this.loading = true
          this._alumnoService.postAlumno(data,this.token).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              this.loading = false
              swal.fire({
                title: 'Foto de Perfil',
                text: "Desea agregar una foto de perfil?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2dce89',
                cancelButtonColor: '#fb6340',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
              }).then((result2) => {
                if (result2.value) {
                  swal.fire({
                    title: 'Foto de perfil',
                    text: 'Seleccione una foto de perfil',
                    input: 'file',
                    inputAttributes: {
                      'accept': 'image/*'
                    },
                    confirmButtonColor: '#2dce89',
                  }).then((result3)=>{
                    if(result3.value){
                      this.loading = true
                      var file = result3.value
                      var formData = new FormData()
                      formData.append('imagen',file)
                      this._alumnoService.uploadImage(formData, data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al alumno exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getAlumnos()
                          })
                        }
                        this.loading = false
                      })
                    }
                    else{
                      this.loading = true
                      this._alumnoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al alumno exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getAlumnos()
                          })
                        }
                      },
                      (error=>{}))
                      this.loading = false
                    }
                  })
                }
                else{
                  this.loading = true
                  this._alumnoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      this.loading = false
                      swal.fire({
                        title: 'Registro exitoso',
                        text: 'Se ha guardado al alumno exitosamente!',
                        type: 'success',
                        confirmButtonColor: '#2dce89',
                      }).then((result)=>{
                        this.getAlumnos()
                      })
                    }
                  },
                  (error=>{}))
                  this.loading = false
                }
              })
            }
          },
          (error)=>{this.loading = false})
        }
      }
    })
  }

  public nuevo_profesor(){
    var asignaturas = {}

    for(let asignatura of this.asignaturas){
      asignaturas[asignatura.id] = asignatura.nombre
    }

    swal.mixin({
      title: 'Nuevo Profesor',
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2', '3'],
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
    }).queue([
      {
        title: 'Datos Personales 1',
        preConfirm: function () {
          return {
            'rut': $('#swal-input0').val(),
            'nombres': $('#swal-input1').val(),
            'apellido_paterno': $('#swal-input2').val(),
            'apellido_materno':  $('#swal-input3').val(),

          }
        },
        html:
          '<label>Rut</label>'+
          '<input id="swal-input0" class="swal2-input placeholders="rut" value ="">' +
          '<label>Nombres</label>'+
          '<input id="swal-input1" class="swal2-input placeholders="nombres" value ="">' +
          '<label>Apellido Paterno</label>'+
          '<input id="swal-input2" class="swal2-input placeholders="apellido_paterno" value="">'+
          '<label>Apellido Materno</label>'+
          '<input id="swal-input3" class="swal2-input placeholders="apellido_materno" value="">'
      },
      {
        title: 'Datos Contacto 1',
        preConfirm: function () {
          return {
              'email':$('#swal-input4').val(),
              'telefono':$('#swal-input5').val(),
              'direccion':$('#swal-input6').val(),
              'numero':$('#swal-input7').val(),
              'comuna':$('#swal-input8').val(),
          }
        },
        html:
          '<label>Email</label>'+
          '<input type="email" id="swal-input4" class="swal2-input placeholders="email" value ="">' +
          '<label>Telefono</label>'+
          '<input id="swal-input5" class="swal2-input placeholders="telefono" value ="">'+
          '<label>Calle</label>'+
          '<input id="swal-input6" class="swal2-input placeholders="calle" value ="">' +
          '<label>Número</label>'+
          '<input id="swal-input7" class="swal2-input placeholders="numero" value ="">'+
          '<label>Comuna</label>'+
          '<input id="swal-input8" class="swal2-input placeholders="comuna" value ="">'
      },
      {
        title: 'Datos Académicos 2',
        text: 'Seleccione asignatura del profesor',
        input: 'select',
        inputOptions: asignaturas,
        inputPlaceholder: 'Asignaturas Preuniversitario',
      }
    ]).then((result1)=> {
      if(result1.value){
        if(
          result1.value[0].nombres=="" ||
          result1.value[0].apellido_paterno=="" ||
          result1.value[0].apellido_materno=="" ||
          result1.value[0].rut=="" ||
          result1.value[1].telefono=="" ||
          result1.value[1].email=="" ||
          result1.value[1].direccion=="" ||
          result1.value[1].numero=="" ||
          result1.value[1].comuna=="" ||
          result1.value[2]==""
          )
        {
          swal.fire({
            type: 'error',
            title: 'Error en el Registro',
            text: 'Debe completar todos los campos para crear un estudiante',
            confirmButtonColor: '#2dce89',
            confirmButtonText: 'Aceptar'
          }).then((result)=>{
            this.nuevo_profesor()
          })
        }
        else{
            const data={
              "nombres" : result1.value[0].nombres,
              "apellido_paterno":result1.value[0].apellido_paterno,
              "apellido_materno":result1.value[0].apellido_materno,
              "rut":result1.value[0].rut,
              "telefono":result1.value[1].telefono,
              "email":result1.value[1].email,
              "calle":result1.value[1].direccion,
              "numero":result1.value[1].numero,
              "comuna":result1.value[1].comuna,
              "asignatura":result1.value[2]
          }
          this.loading = true
          this._profesorService.postProfesor(data,this.token).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              this.loading = false
              swal.fire({
                title: 'Foto de Perfil',
                text: "Desea agregar una foto de perfil?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2dce89',
                cancelButtonColor: '#fb6340',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
              }).then((result2) => {
                if (result2.value) {
                  swal.fire({
                    title: 'Foto de perfil',
                    text: 'Seleccione una foto de perfil',
                    input: 'file',
                    inputAttributes: {
                      'accept': 'image/*'
                    },
                    confirmButtonColor: '#2dce89',
                  }).then((result3)=>{
                    if(result3.value){
                      var file = result3.value
                      var formData = new FormData()
                      formData.append('imagen',file)
                      this.loading = true
                      this._profesorService.uploadImage(formData, data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al profesor exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getProfesores()
                          })
                        }
                      })
                      this.loading = false
                    }
                    else{
                      this.loading = true
                      this._profesorService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al profesor exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getProfesores()
                          })
                        }
                        this.loading = false
                      },
                      (error=>{this.loading = false}))
                    }
                  })
                }
                else{
                  this.loading = true
                  this._profesorService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      this.loading = false
                      swal.fire({
                        title: 'Registro exitoso',
                        text: 'Se ha guardado al profesor exitosamente!',
                        type: 'success',
                        confirmButtonColor: '#2dce89',
                      }).then((result)=>{
                        this.getProfesores()
                      })
                    }
                    this.loading = false
                  },
                  (error=>{this.loading = false}))
                }
              })
            }
          },
          (error)=>{this.loading = false})
        }
      }
    })
  }

  public nuevo_apoderado(){
    swal.mixin({
      title: 'Nuevo Profesor',
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2', '3'],
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
    }).queue([
      {
        title: 'Datos Personales 1',
        preConfirm: function () {
          return {
            'rut': $('#swal-input0').val(),
            'nombres': $('#swal-input1').val(),
            'apellido_paterno': $('#swal-input2').val(),
            'apellido_materno':  $('#swal-input3').val(),

          }
        },
        html:
          '<label>Rut</label>'+
          '<input id="swal-input0" class="swal2-input placeholders="rut" value ="">' +
          '<label>Nombres</label>'+
          '<input id="swal-input1" class="swal2-input placeholders="nombres" value ="">' +
          '<label>Apellido Paterno</label>'+
          '<input id="swal-input2" class="swal2-input placeholders="apellido_paterno" value="">'+
          '<label>Apellido Materno</label>'+
          '<input id="swal-input3" class="swal2-input placeholders="apellido_materno" value="">'
      },
      {
        title: 'Datos Contacto 1',
        preConfirm: function () {
          return {
              'email':$('#swal-input4').val(),
              'telefono':$('#swal-input5').val(),
              'direccion':$('#swal-input6').val(),
              'numero':$('#swal-input7').val(),
              'comuna':$('#swal-input8').val(),
          }
        },
        html:
          '<label>Email</label>'+
          '<input type="email" id="swal-input4" class="swal2-input placeholders="email" value ="">' +
          '<label>Telefono</label>'+
          '<input id="swal-input5" class="swal2-input placeholders="telefono" value ="">'+
          '<label>Calle</label>'+
          '<input id="swal-input6" class="swal2-input placeholders="calle" value ="">' +
          '<label>Número</label>'+
          '<input id="swal-input7" class="swal2-input placeholders="numero" value ="">'+
          '<label>Comuna</label>'+
          '<input id="swal-input8" class="swal2-input placeholders="comuna" value ="">'
      }
    ]).then((result1)=> {
      if(result1.value){
        if(
          result1.value[0].nombres=="" ||
          result1.value[0].apellido_paterno=="" ||
          result1.value[0].apellido_materno=="" ||
          result1.value[0].rut=="" ||
          result1.value[1].telefono=="" ||
          result1.value[1].email=="" ||
          result1.value[1].direccion=="" ||
          result1.value[1].numero=="" ||
          result1.value[1].comuna==""
          )
        {
          swal.fire({
            type: 'error',
            title: 'Error en el Registro',
            text: 'Debe completar todos los campos para crear un apoderado',
            confirmButtonColor: '#2dce89',
            confirmButtonText: 'Aceptar',
          }).then((result)=>{
            this.nuevo_apoderado()
          })
        }
        else{
          const data={
              "nombres" : result1.value[0].nombres,
              "apellido_paterno":result1.value[0].apellido_paterno,
              "apellido_materno":result1.value[0].apellido_materno,
              "rut":result1.value[0].rut,
              "telefono":result1.value[1].telefono,
              "email":result1.value[1].email,
              "calle":result1.value[1].direccion,
              "numero":result1.value[1].numero,
              "comuna":result1.value[1].comuna
          }
          this.loading = true
          this._apoderadoService.postApoderado(data,this.token).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              this.loading = false
              swal.fire({
                title: 'Foto de Perfil',
                text: "Desea agregar una foto de perfil?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2dce89',
                cancelButtonColor: '#fb6340',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
              }).then((result2) => {
                if (result2.value) {
                  swal.fire({
                    title: 'Foto de perfil',
                    text: 'Seleccione una foto de perfil',
                    input: 'file',
                    inputAttributes: {
                      'accept': 'image/*'
                    },
                    confirmButtonColor: '#2dce89',
                  }).then((result3)=>{
                    if(result3.value){
                      var file = result3.value
                      var formData = new FormData()
                      formData.append('imagen',file)
                      this.loading = true
                      this._apoderadoService.uploadImage(formData, data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          this.asignarAlumno(data['id'])
                        }
                        this.loading = false
                      })
                    }
                    else{
                      this.loading = true
                      this._apoderadoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          this.asignarAlumno(data['id'])
                        }
                        this.loading = false
                      },
                      (error=>{this.loading = false}))
                    }
                  })
                }
                else{
                  this.loading = true
                  this._apoderadoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      this.loading = false
                      this.asignarAlumno(data['id'])
                    }
                    this.loading = false
                  },
                  (error=>{this.loading = false}))
                  //agregar foto de perfil por defecto
                }
              })
            
            }
          },
          (error)=>{this.loading = false})
        }
      }
    })
  }

  public nuevo_administrador(){
    swal.mixin({
      title: 'Nuevo Administrador',
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2'],
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
    }).queue([
      {
        title: 'Datos Personales 1',
        preConfirm: function () {
          return {
            'rut': $('#swal-input0').val(),
            'nombres': $('#swal-input1').val(),
            'apellido_paterno': $('#swal-input2').val(),
            'apellido_materno':  $('#swal-input3').val(),

          }
        },
        html:
          '<label>Rut</label>'+
          '<input id="swal-input0" class="swal2-input placeholders="rut" value ="">' +
          '<label>Nombres</label>'+
          '<input id="swal-input1" class="swal2-input placeholders="nombres" value ="">' +
          '<label>Apellido Paterno</label>'+
          '<input id="swal-input2" class="swal2-input placeholders="apellido_paterno" value="">'+
          '<label>Apellido Materno</label>'+
          '<input id="swal-input3" class="swal2-input placeholders="apellido_materno" value="">'
      },
      {
        title: 'Datos Contacto 1',
        preConfirm: function () {
          return {
              'email':$('#swal-input4').val(),
              'telefono':$('#swal-input5').val()
          }
        },
        html:
          '<label>Email</label>'+
          '<input type="email" id="swal-input4" class="swal2-input placeholders="email" value ="">' +
          '<label>Telefono</label>'+
          '<input id="swal-input5" class="swal2-input placeholders="telefono" value ="">'
        }
    ]).then((result1)=> {
      if(result1.value){
        if(
          result1.value[0].nombres=="" ||
          result1.value[0].apellido_paterno=="" ||
          result1.value[0].apellido_materno=="" ||
          result1.value[0].rut=="" ||
          result1.value[1].telefono=="" ||
          result1.value[1].email==""
          )
        {
          swal.fire({
            type: 'error',
            title: 'Error en el Registro',
            text: 'Debe completar todos los campos para crear un administrador',
            confirmButtonColor: '#2dce89',
            confirmButtonText: 'Aceptar',
          }).then((result)=>{
            this.nuevo_administrador()
          })
        }
        else{
          const data={
              "nombres" : result1.value[0].nombres,
              "apellido_paterno":result1.value[0].apellido_paterno,
              "apellido_materno":result1.value[0].apellido_materno,
              "rut":result1.value[0].rut,
              "telefono":result1.value[1].telefono,
              "email":result1.value[1].email,
              "calle":result1.value[1].direccion,
              "numero":result1.value[1].numero,
              "comuna":result1.value[1].comuna
          }
          this.loading = true
          this._administradorService.postAdministrador(data,this.token).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              this.loading = false
              swal.fire({
                title: 'Foto de Perfil',
                text: "Desea agregar una foto de perfil?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2dce89',
                cancelButtonColor: '#fb6340',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
              }).then((result2) => {
                if (result2.value) {
                  swal.fire({
                    title: 'Foto de perfil',
                    text: 'Seleccione una foto de perfil',
                    input: 'file',
                    inputAttributes: {
                      'accept': 'image/*'
                    },
                    confirmButtonColor: '#2dce89',
                  }).then((result3)=>{
                    if(result3.value){
                      var file = result3.value
                      var formData = new FormData()
                      formData.append('imagen',file)
                      this.loading = true
                      this._administradorService.uploadImage(formData, data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al administrador exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getAdministradores()
                          })
                        }
                        this.loading = false
                      })
                      this.loading = false
                    }
                    else{
                      this.loading = true
                      this._administradorService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          this.loading = false
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al administrador exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getAdministradores()
                          })
                        }
                        this.loading = false
                      },
                      (error=>{this.loading = false}))
                    }
                  })
                }
                else{
                  this.loading = true
                  this._administradorService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      this.loading = false
                      swal.fire({
                        title: 'Registro exitoso',
                        text: 'Se ha guardado al administrador exitosamente!',
                        type: 'success',
                        confirmButtonColor: '#2dce89',
                      }).then((result)=>{
                        this.getAdministradores()
                      })
                    }
                    this.loading = false
                  },
                  (error=>{this.loading = false}))
                  //agregar foto de perfil por defecto
                }
              })
              this.loading = false
            
            }
          },
          (error)=>{this.loading = false})
        }
      }
    })
  }

  generarVistaHojaVida(id:string){
    this.router.navigateByUrl('/admin/perfiles/hoja_vida/'+id);
  }

  verDetalleProfesor(id:string){
    this.router.navigateByUrl('/admin/perfiles/detalle_profesor/'+id);
  }

  asignarAlumno(id:string){
    swal.fire({
      type: 'question',
      input: 'text',
      confirmButtonColor: '#2dce89',
      confirmButtonText: 'Aceptar',
      title: 'Pupilo de Apoderado',
      text: 'Digite el rut del alumno ej:(11111111-1)',
    }).then((result)=>{
      if(result.dismiss == null){
        this._alumnoTablaService.getAlumnos()
        var bandera = false
        var id_alumno = ""
        for(let alumno of this.alumnos){
          if(alumno.rut == result.value){
            id_alumno=alumno.id
            bandera = true
          }
        }
        if(bandera){
          this.loading = true
          this._apoderadoService.asignarAlumno(id,id_alumno,this.token).subscribe((data:any)=>{
            if(data['Response']=="exito"){
              this.loading = false
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha guardado al profesor exitosamente!',
                type: 'success',
                confirmButtonColor: '#2dce89',
              }).then((result)=>{
                this.getApoderados()
              })
            }
            this.loading = false
          })
        }
        else{
          swal.fire({
            type: 'error',
            text: 'No hay alumno con el rut ingresado',
            title: 'Error en la busqueda',
            confirmButtonColor: '#2dce89',
            confirmButtonText: 'Aceptar',
          }).then((result)=>{
            this.asignarAlumno(id)
          })
        }
      }
      else{
        this.asignarAlumno(id)
      }
    })
  }
}
