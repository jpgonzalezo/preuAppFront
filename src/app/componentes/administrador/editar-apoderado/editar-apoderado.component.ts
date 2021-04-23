import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Apoderado } from 'src/app/modelos/apoderado.model';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-apoderado',
  templateUrl: './editar-apoderado.component.html',
  styleUrls: ['./editar-apoderado.component.css']
})
export class EditarApoderadoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  alumnos: Alumno[]
  asignaturas = [];
  apoderado:Apoderado;
  id_apoderado:string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rutValidator: RutValidator,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _apoderadoService: ApoderadoService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id_apoderado = this._activatedRoute.snapshot.paramMap.get('id');
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getApoderado();
    this.createForm = this.formBuilder.group({
      nombres: ['',[Validators.required]],
      apellido_paterno: ['',[Validators.required]],
      apellido_materno: ['',[Validators.required]],
      rut: ['',[Validators.required, this.rutValidator]],
      rut_alumno: ['',[Validators.required, this.rutValidator]],
      telefono: ['',[Validators.required,ValidatorNumber.strong,Validators.maxLength(9)]],
      email:['',[Validators.required, Validators.email]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      comuna: ['',[Validators.required]],
      cas_dep_of: ['',[]],
    });
  }

  getApoderado(){
    this.loading = true;
    this._apoderadoService.getApoderado(this.id_apoderado,this.token).subscribe((data:Apoderado)=>{
      this.loading = false;
      this.apoderado = data;
      this.createForm.get('nombres').setValue(this.apoderado.nombres);
      this.createForm.get('apellido_paterno').setValue(this.apoderado.apellido_paterno);
      this.createForm.get('apellido_materno').setValue(this.apoderado.apellido_materno);
      this.createForm.get('rut').setValue(this.apoderado.rut);
      this.createForm.get('telefono').setValue(this.apoderado.telefono);
      this.createForm.get('email').setValue(this.apoderado.email);
      this.createForm.get('calle').setValue(this.apoderado.direccion.calle);
      this.createForm.get('numero').setValue(this.apoderado.direccion.numero);
      this.createForm.get('comuna').setValue(this.apoderado.direccion.comuna);
      this.createForm.get('cas_dep_of').setValue(this.apoderado.direccion.cas_dep_of);
      this.createForm.get('rut_alumno').setValue(this.apoderado.alumno.rut);
    },
    (error)=>{
      this.loading = false
    });
  }

  get f() { return this.createForm.controls; }

  getErrorMessageEmail() {
    return this.createForm.get('email').hasError('required')
      ? 'Debe ingresar un email'
      : this.createForm.get('email').hasError('email')
        ? 'Email no valido'
        : '';
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

  getErrorMessageRutAlumno(){
    return this.createForm.get('rut_alumno').hasError('required')
    ? 'Debe ingresar un rut.'
      : (
          this.createForm.get('rut_alumno').hasError('invalidRut') ? 'El rut debe ser valido' : ''
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

  getErrorMessageTelefono(){
    return this.createForm.get('telefono').hasError('required')
    ? 'Debe ingresar un telefono.'
      : (
          this.createForm.get('telefono').hasError('notNumber') ? 'Debe ingresar solo números, sin código de área.' : (
            this.createForm.get('telefono').hasError('maxlength') ? 'Teléfono no puede superar los 9 digitos' : ''
          )
        );
  }

  getErrorMessageCalle(){
    return this.createForm.get('calle').hasError('required')
      ? 'Debe ingresar una calle.'
        : '';
  }

  getErrorMessageNumero(){
    return this.createForm.get('numero').hasError('required')
      ? 'Debe ingresar una numeración.'
        : '';
  }

  getErrorMessageComuna(){
    return this.createForm.get('comuna').hasError('required')
      ? 'Debe ingresar una comuna.'
        : '';
  }

  getErrorMessageAsignatura(){
    return this.createForm.get('asignatura').hasError('required')
      ? 'Debe seleccionar una asignatura.'
        : '';
  }

  guardarApoderado(){
    this.loading = true
    const data = this.createForm.value;
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('-','');
    this._apoderadoService.putApoderado(this.id_apoderado,data,this.token).subscribe(
      (data:any)=>{
        if(data['Response']=="exito"){
          this.loading = false
          swal.fire({
            title: 'Registro exitoso',
            text: 'Se ha editado al apoderado exitosamente!',
            type: 'success',
            confirmButtonColor: '#2dce89',
          }).then((result)=>{
            this.loading = false;
            this.router.navigateByUrl('/admin/perfiles');
          })
        }
        if(data['Response']=='not_alumno'){
          this.loading = false;
          swal.fire({
            type:'error',
            title:'Alumno no econtrado',
            text:'Verifique el rut del alumno ingresado.',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar',
          }).then((result)=>{
            this.getApoderado();
          })
        }
    },
    (error)=>{
      this.loading = false;
      swal.fire({
        type:'error',
        title:'Error en el servidor',
        text:'Ocurrió un error en el servidor, intente más tarde',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: 'Aceptar',
      });
    })


  }

  volver(){
    this.router.navigateByUrl('/admin/perfiles');
  }


}
