import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { Alumno } from 'src/app/modelos/alumno.model';
import { ApoderadoService } from 'src/app/servicios/apoderado.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';

@Component({
  selector: 'app-nuevo-apoderado',
  templateUrl: './nuevo-apoderado.component.html',
  styleUrls: ['./nuevo-apoderado.component.css']
})
export class NuevoApoderadoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  alumnos: Alumno[]
  asignaturas = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rutValidator: RutValidator,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _apoderadoService: ApoderadoService,
  ) { }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
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
    let data = this.createForm.value;
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('-','');

    this.loading = true
    this._apoderadoService.postApoderado(data,this.token).subscribe((data:any)=>{
      this.loading = false;
      if(data['Response']=='not_alumno'){
        swal.fire({
          type: 'error',
          title: 'Error en el Registro',
          text: 'No existe un alumno con el rut ingresado.',
          confirmButtonColor: '#2dce89',
          confirmButtonText: 'Aceptar',
        }).then((result)=>{
          this.loading = false;
        })
      }

      if(data['Response']=='exito'){
        this.loading = false
        swal.fire({
          title: 'Foto de perfil',
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
                    swal.fire({
                      title: 'Registro exitoso',
                      text: 'Se ha guardado correctamente el apoderado.',
                      type: 'success',
                      confirmButtonColor: '#2dce89',
                    }).then((result)=>{
                      this.router.navigateByUrl('/admin/perfiles');
                    });

                  }
                  this.loading = false
                })
              }
              else{
                this.loading = true
                this._apoderadoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                  if(data['Response']=="exito"){
                    this.loading = false
                    swal.fire({
                      title: 'Registro exitoso',
                      text: 'Se ha guardado correctamente el apoderado.',
                      type: 'success',
                      confirmButtonColor: '#2dce89',
                    }).then((result)=>{
                      this.router.navigateByUrl('/admin/perfiles');
                    });
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
                swal.fire({
                  title: 'Registro exitoso',
                  text: 'Se ha guardado correctamente el apoderado.',
                  type: 'success',
                  confirmButtonColor: '#2dce89',
                }).then((result)=>{
                  this.router.navigateByUrl('/admin/perfiles');
                });
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

  volver(){
    this.router.navigateByUrl('/admin/perfiles');
  }



}
