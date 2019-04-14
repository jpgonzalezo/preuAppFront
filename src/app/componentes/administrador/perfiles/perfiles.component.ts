import { Component, OnInit} from '@angular/core';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Colegio } from 'src/app/modelos/colegio.model';
import { Curso } from 'src/app/modelos/curso.models';
import swal from'sweetalert2';
import { Config } from 'src/app/config';

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
  colegios: Colegio[];
  cursos: Curso[];

  constructor(private _alumnoService: AlumnoService, 
              private formBuilder: FormBuilder,
              private _cursoService: CursoService,
              private router: Router,
              private _profesorService: ProfesorService,
              private _asignaturaService: AsignaturaService,
              private _colegioService: ColegioService
    )
  { 
    this.cursos = []
    this.colegios = []
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
    this.getColegios();
    this.getCursos();
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
        console.log(alumno.imagen)
        alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
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

  public getColegios(){
    this._colegioService.getColegios().subscribe((colegios: Array<Colegio>)=>{
      this.colegios = colegios
    })
  }

  public getCursos(){
    this._cursoService.getCursos().subscribe((cursos: Array<Curso>)=>{
      this.cursos = cursos
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
        console.log(result1.value[1].imagen)
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
          this._alumnoService.postAlumno(data).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              swal.fire({
                title: 'Foto de Perfil',
                text: "Desea agregar una foto de perfil?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2dce89',
                cancelButtonColor: '#fb6340',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
              }).then((result2) => {
                console.log(result2.value)
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
                      this._alumnoService.uploadImage(formData, data['id']).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
                          swal.fire({
                            title: 'Registro exitoso',
                            text: 'Se ha guardado al alumno exitosamente!',
                            type: 'success',
                            confirmButtonColor: '#2dce89',
                          }).then((result)=>{
                            this.getAlumnos()
                          })
                        }
                      })
                    }
                    else{
                      console.log("entre else 2")
                      this._alumnoService.uploadImageDefault(data['id']).subscribe((data:any)=>{
                        if(data['Response']=="exito"){
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
                    }
                  })
                }
                else{
                  console.log(data['id'])
                  console.log("entre else1")
                  this._alumnoService.uploadImageDefault(data['id']).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
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
                  //agregar foto de perfil por defecto
                }
              })
            }
          },
          (error)=>{console.log("error")})
        }
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
