import { Component, OnInit,Output, EventEmitter,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlumnoService } from '../../../servicios/alumno.service';

@Component({
  selector: 'app-nuevo-perfil',
  templateUrl: './nuevo-perfil.component.html',
  styleUrls: ['./nuevo-perfil.component.css']
})
export class NuevoPerfilComponent implements OnInit {
  @Input() tipo_nuevo_perfil:string;
  sexo_dropdown:string;
  formGroupDatosPersonalesEstudiante: FormGroup;
  formGroupDatosAcademicosEstudiante: FormGroup;
  formGroupDatosContactoEstudiante: FormGroup;
  @Output()
  guardado_exitoso = new EventEmitter<any>()
  constructor(private formBuilderDatosEstudiante: FormBuilder, 
    private formBuilderAcademicoEstudiante: FormBuilder,
    private formBuilderContactoEstudiante: FormBuilder, 
    private _alumnoService: AlumnoService) { 
    this.sexo_dropdown = "Seleccione sexo";
  }

  ngOnInit() {
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
      password:[''],
      sexo:this.sexo_dropdown
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
      nombre_usuario:[''],
      password:['1234'],
      matricula:[''],
    })
  }


  public cambiarSexo(opcion:string){
    this.sexo_dropdown = opcion;
  }

  public guardarPerfilEstudiante(){
    const alumnoPersonal = this.formGroupDatosPersonalesEstudiante.value;
    const alumnoContacto = this.formGroupDatosContactoEstudiante.value;
    const alumnoAcademico = this.formGroupDatosAcademicosEstudiante.value;
    console.log(alumnoPersonal);
    console.log(alumnoContacto)
/*     this._alumnoService.postAlumno({'data_personal':alumnoPersonal,'data_academico':alumnoAcademico}).subscribe((data:any)=>{
      if(data['Response']=='exito'){
        swal.fire('Registro exitoso','Se registrado a un alumno exitosamente','success').then((result)=>{this.guardado_exitoso.emit("home")})
      }
    }) */
  }
}
