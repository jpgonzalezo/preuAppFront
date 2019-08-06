import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/modelos/curso.model';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { CursoService } from 'src/app/servicios/curso.service';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { Alumno } from 'src/app/modelos/alumno.model';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { Config } from 'src/app/config';
import Swal from 'sweetalert2';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
@Component({
  selector: 'app-nueva-asistencia',
  templateUrl: './nueva-asistencia.component.html'
})
export class NuevaAsistenciaComponent implements OnInit {
  pageAlumnosCurso: number;
  pageSizeAlumnosCurso: number;
  collectionSizeAlumnosCurso: number;
  pageAlumnosPresente: number;
  pageSizeAlumnosPresente: number;
  collectionSizeAlumnosPresente: number;
  pageAlumnosAusente: number;
  pageSizeAlumnosAusente: number;
  collectionSizeAlumnosAusente: number;
  cursos: Curso[]
  asignaturas: Asignatura[]
  alumnos_curso: Alumno[]
  alumnos_presentes: Alumno[]
  alumnos_ausentes: Alumno[]
  seleccionCurso: boolean
  cursoSeleccionado: string
  asignaturaSeleccionada: string
  id_curso_seleccionado:string
  id_asignatura_seleccionada:string
  token: string
  constructor(private _asistenciaService: AsistenciaService,
    private _router:Router,
    private _alumnoService: AlumnoService,
    private _cursoService: CursoService, 
    private _asignaturaService: AsignaturaService,
    private _localService: LocalService,
    private _storageService: StorageService,
  ) 
  {
    this.pageAlumnosCurso = 1;
    this.pageSizeAlumnosCurso = 10;
    this.pageAlumnosPresente = 1;
    this.pageSizeAlumnosPresente = 10;
    this.pageAlumnosAusente = 1;
    this.pageSizeAlumnosAusente = 10;
    this.asignaturas = []
    this.cursos = []
    this.alumnos_ausentes = []
    this.alumnos_presentes = []
    this.alumnos_curso = []
    this.id_asignatura_seleccionada =""
    this.id_curso_seleccionado =""
    this.seleccionCurso = true
    this.cursoSeleccionado = "Seleccione un curso"
    this.asignaturaSeleccionada = "Seleccione una asignatura"
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getCursos()
  }

  getCursos(){
    this._cursoService.getCursos(this.token).subscribe((data:Curso[])=>{
      this.cursos = data
    })
  }

  getAsignaturas(id:string){
    this._asignaturaService.getAsignaturasCurso(id,this.token).subscribe((data:Asignatura[])=>{
      this.asignaturas = data
    })
  }

  cambiarCurso(nombre:string,id_curso:string){
    this.cursoSeleccionado = nombre
    if(nombre != "Seleccione un curso"){
      this.seleccionCurso = false
      this.asignaturaSeleccionada = "Seleccione una asignatura"
      this.id_asignatura_seleccionada=""
      this.id_curso_seleccionado = id_curso
      this.getAsignaturas(this.id_curso_seleccionado)
      this._alumnoService.getAlumnosCurso(this.id_curso_seleccionado,this.token).subscribe((data:Alumno[])=>{
        this.alumnos_curso = data
        this.collectionSizeAlumnosCurso = this.alumnos_curso.length
        for(let alumno of this.alumnos_curso){
          alumno.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+alumno.imagen
        }
      })
    }
    else{
      this.asignaturaSeleccionada = "Seleccione una asignatura"
      this.seleccionCurso = true
      this.id_curso_seleccionado = ""
      this.id_asignatura_seleccionada=""
      this.alumnos_curso = []
      this.alumnos_presentes = []
      this.alumnos_ausentes = []
    }
  }

  cambiarAsignatura(nombre:string,id_asignatura:string){
    this.asignaturaSeleccionada = nombre
    if(nombre=="Seleccione una asignatura"){
      this.id_asignatura_seleccionada=""
    }
    else{
      this.id_asignatura_seleccionada=id_asignatura
    }
  }
  volverAlumnoCurso(id:string,lista:string){
    var aux=[]
    if(lista=="presente"){
      for(let alumno of this.alumnos_presentes){
        if(alumno.id == id){
          this.alumnos_curso.push(alumno)
        }
        else{
          aux.push(alumno)
        }
      }
      this.alumnos_presentes = aux
      this.collectionSizeAlumnosCurso = this.alumnos_curso.length
      this.collectionSizeAlumnosPresente = this.alumnos_presentes.length
    }
    if(lista=="ausente"){
      for(let alumno of this.alumnos_ausentes){
        if(alumno.id == id){
          this.alumnos_curso.push(alumno)
        }
        else{
          aux.push(alumno)
        }
      }
      this.alumnos_ausentes = aux
      this.collectionSizeAlumnosCurso = this.alumnos_curso.length
      this.collectionSizeAlumnosAusente = this.alumnos_ausentes.length
    }
  }

  alumnoPresente(id:string){
    var aux = []
    for(let alumno of this.alumnos_curso){
      if(alumno.id==id){
        this.alumnos_presentes.push(alumno)
      }
      else{
        aux.push(alumno)
      }
    }
    this.alumnos_curso = aux
    this.collectionSizeAlumnosCurso = this.alumnos_curso.length
    this.collectionSizeAlumnosPresente = this.alumnos_presentes.length
  }

  alumnoAusente(id:string){
    var aux = []
    for(let alumno of this.alumnos_curso){
      if(alumno.id==id){
        this.alumnos_ausentes.push(alumno)
      }
      else{
        aux.push(alumno)
      }
    }
    this.alumnos_curso = aux
    this.collectionSizeAlumnosCurso = this.alumnos_curso.length
    this.collectionSizeAlumnosAusente = this.alumnos_ausentes.length
  }

  volver(){
    this._router.navigateByUrl('/admin/asistencia');
  }

  guardarAsistencia(){
    Swal.fire({
      type:'question',
      title:'Desea guardar el registro de asistencia?',
      text:'Los alumnos no considerados quedarán ausentes',
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result)=>{
      if(result.value){
        for(let alumno of this.alumnos_curso){
          this.alumnos_ausentes.push(alumno)
        }
        this._asistenciaService.postAsistencia(
          {
            'id_curso': this.id_curso_seleccionado,
            'id_asignatura': this.id_asignatura_seleccionada,
            'presentes': this.alumnos_presentes,
            'ausentes': this.alumnos_ausentes
          },this.token
        ).subscribe((data:any)=>{
          if(data['Response']=="exito"){
            Swal.fire({
              title:'Registro exitoso',
              text:'Se ha guardado la asistencia correctamente!',
              type:'success',
              confirmButtonColor: '#2dce89',
            }).then((result)=>{
              this.volver()
            })
          }
        })
      }
    })
  }

  get alumnos_curso_tabla(): any[] {
    return this.alumnos_curso
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumnosCurso - 1) * this.pageSizeAlumnosCurso, (this.pageAlumnosCurso - 1) * this.pageSizeAlumnosCurso + this.pageSizeAlumnosCurso);
  }

  get alumnos_presente_tabla(): any[] {
    return this.alumnos_presentes
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumnosPresente - 1) * this.pageSizeAlumnosPresente, (this.pageAlumnosPresente - 1) * this.pageSizeAlumnosPresente + this.pageSizeAlumnosPresente);
  }

  get alumnos_ausente_tabla(): any[] {
    return this.alumnos_ausentes
      .map((alumno, i) => ({id: i + 1, ...alumno}))
      .slice((this.pageAlumnosAusente - 1) * this.pageSizeAlumnosAusente, (this.pageAlumnosAusente - 1) * this.pageSizeAlumnosAusente + this.pageSizeAlumnosAusente);
  }
}
