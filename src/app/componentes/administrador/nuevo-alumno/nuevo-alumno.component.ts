import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { ValidatorNumber } from 'src/app/validators/number.validators';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.css']
})
export class NuevoAlumnoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;

  sexos = [
    { value: 'MASCULINO', viewValue: 'Masculino' },
    { value: 'FEMENINO', viewValue: 'Femenino' },
    { value: 'NO DEFINIDO', viewValue: 'Otro' }
  ];

  administrador = [
    { value: true, viewValue: 'SI' },
    { value: false, viewValue: 'NO'}
  ];

  companies = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rutValidator: RutValidator
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      nombres: ['',[Validators.required]],
      apellido_paterno: ['',[Validators.required]],
      apellido_materno: ['',[Validators.required]],
      rut: ['',[Validators.required, this.rutValidator]],
      puntaje_ingreso: ['',[ Validators.required,ValidatorNumber.strong]],
      sexo: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      comuna: ['',[Validators.required]],
      cas_dep_of: ['',[Validators.required]],
      curso: ['',[Validators.required]],
      colegio: ['',[Validators.required]],
    })
  }


  getErrorMessageNombres(){
    return this.createForm.get('nombres').hasError('required')
    ? 'Debe ingresar los nombres del alumno.'
      : '';
  }

  getErrorMessageApellidoPaterno(){
    return this.createForm.get('apellido_paterno').hasError('required')
    ? 'Debe ingresar apellido paterno.'
      : '';
  }

  getErrorMessageApellidoMaterno(){
    return this.createForm.get('apellido_paterno').hasError('required')
    ? 'Debe ingresar apellido materno.'
      : '';
  }

  getErrorMessageRut(){
    return this.createForm.get('rut').hasError('required')
    ? 'Debe ingresar un rut.'
      : (
          this.createForm.get('rut').hasError('invalidRut') ? 'El rut debe ser valido' : ''
        );
  }

  getErrorMessageSexo(){
    return this.createForm.get('sexo').hasError('required')
      ? 'Debe seleccionar un sexo.'
        : '';
  }

  getErrorMessagePuntajeIngreso(){
    return this.createForm.get('puntaje_ingreso').hasError('required')
    ? 'Debe ingresar un puntaje.'
      : (
          this.createForm.get('puntaje_ingreso').hasError('notNumber') ? 'Puntaje debe ser un número' : ''
        );
  }



}
