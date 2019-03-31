import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AlumnoService } from '../../../servicios/alumno.service';
import { ColegioService} from '../../../servicios/colegio.service';
import { ApoderadoService} from '../../../servicios/apoderado.service';
import { CursoService } from '../../../servicios/curso.service';
import { ActivatedRoute, Router } from '@angular/router'
import swal from'sweetalert2';

@Component({
  selector: 'app-nuevo-perfil',
  templateUrl: './nuevo-perfil.component.html',
  styleUrls: ['./nuevo-perfil.component.css']
})
export class NuevoPerfilComponent implements OnInit {
  colegios:any;
  apoderados:any;
  cursos:any;
  sexo_seleccion:FormControl;
  sexo_dropdown:string;
  colegio_seleccion:FormControl;
  colegio_dropdown:string;
  curso_seleccion:FormControl;
  curso_dropdown:string;
  formGroupDatosPersonalesEstudiante: FormGroup;
  formGroupDatosAcademicosEstudiante: FormGroup;
  formGroupDatosContactoEstudiante: FormGroup;
  tipo_nuevo_perfil:string;
  @Output()
  guardado_exitoso = new EventEmitter<any>()
  constructor(private formBuilderDatosEstudiante: FormBuilder, 
    private formBuilderAcademicoEstudiante: FormBuilder,
    private formBuilderContactoEstudiante: FormBuilder, 
    private _alumnoService: AlumnoService,
    private _colegioService: ColegioService,
    private _apoderadoService: ApoderadoService,
    private _cursoService: CursoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) 
    { 
    this.sexo_dropdown = "Seleccione sexo";
    this.colegio_dropdown = "Seleccione colegio";
    this.sexo_seleccion = new FormControl("");
    this.colegio_seleccion = new FormControl("");
    this.curso_dropdown = "Seleccione curso";
    this.curso_seleccion = new FormControl("");
    this.colegios=[];
    this.apoderados=[];
    this.cursos=[];
  }

  ngOnInit() {
    this.tipo_nuevo_perfil = this._activatedRoute.snapshot.paramMap.get('tipo_perfil')
    this.getCursos();
    this.getColegios();
    this.getApoderado();
    this.buildFormPersonalEstudiante();
    this.builFormAcademicoEstudiante();
    this.builFormContactoEstudiante();
  }

  private buildFormPersonalEstudiante(){
    this.formGroupDatosPersonalesEstudiante = this.formBuilderDatosEstudiante.group({
      nombres:[''],
      apellido_paterno:[''],
      apellido_materno:[''],
      email:[''],
      telefono:[''],
      rut:[''],
      nombre_usuario:[''],
      sexo: this.sexo_seleccion
    });
  }

  private builFormContactoEstudiante(){
    this.formGroupDatosContactoEstudiante = this.formBuilderContactoEstudiante.group({
      email:[''],
      telefono:[''],
      calle:[''],
      numero:[''],
      comuna:[''],
    })
  }

  private builFormAcademicoEstudiante(){
    this.formGroupDatosAcademicosEstudiante = this.formBuilderAcademicoEstudiante.group({
      colegio: this.colegio_seleccion,
      curso:this.curso_seleccion,
      puntaje_ingreso:[''],
    })
  }

  private validateColegio(control: AbstractControl) {
    const colegio = control.value;
    let error = null;
    if(colegio.value ==""){
      error = {"error":"no se ha seleccionado sexo"}
    }
    return error;
  }

  public getColegios(){
  	this._colegioService.getColegios().subscribe((data: Array<any>) => {
      this.colegios = data;
    });
  }

  public getApoderado(){
  	this._apoderadoService.getApoderados().subscribe((data: Array<any>) => {
      this.apoderados = data;
    });
  }

  public getCursos(){
  	this._cursoService.getCursos().subscribe((data: Array<any>) => {
      this.cursos = data;
    });
  }

  public cambiarSexo(opcion:string){
    this.sexo_dropdown = opcion;
    this.sexo_seleccion.setValue(opcion);
  }

  public cambiarColegio(opcion:string, id:string){
    this.colegio_dropdown = opcion;
    this.colegio_seleccion.setValue(id);
  }

  public cambiarCurso(opcion:string, id:string){
    this.curso_dropdown = opcion;
    this.curso_seleccion.setValue(id);
  }

  public cancelar(){
    this._router.navigateByUrl('/admin/perfiles');
  }

  public guardarPerfilEstudiante(){
    const alumnoPersonal = this.formGroupDatosPersonalesEstudiante.value;
    const alumnoContacto = this.formGroupDatosContactoEstudiante.value;
    const alumnoAcademico = this.formGroupDatosAcademicosEstudiante.value;
    var sexo_error=false
    var colegio_error=false
    var curso_error=false
    var mensaje = "Debe seleccionar: "
    if(alumnoAcademico["colegio"]==""){
      colegio_error=true
      mensaje = mensaje + "colegio "
    }
    if(alumnoAcademico["curso"]==""){
      curso_error=true
      mensaje = mensaje + "curso "
    }
    if(alumnoPersonal["sexo"]==""){
      sexo_error=true
      mensaje = mensaje + "sexo "
    }
    if(colegio_error || sexo_error || curso_error){
      swal.fire({
        title: "Error nuevo perfil",
        text: mensaje,
        type: 'error'
      })
    }
    else{
      this._alumnoService.postAlumno({'data_personal':alumnoPersonal,
        'data_academico':alumnoAcademico, 
        'data_contacto':alumnoContacto}).subscribe((data:any)=>{
        if(data['Response']=='exito'){
          swal.fire({title:'Registro exitoso',
                     text:'Se registrado a '+ data['nombres']+" "+data['apellido_paterno']+" "+data['apellido_materno'] +' exitosamente',
                     type:'success',
                     confirmButtonColor: '#5e72e4',
                     cancelButtonColor: '#d33',}).then((result)=>{this._router.navigateByUrl('/admin/perfiles')})
        }
      }) 
    }
  }
}
