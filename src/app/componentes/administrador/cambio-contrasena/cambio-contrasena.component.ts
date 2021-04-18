import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Session } from 'src/app/modelos/session.model';
import { PasswordValidatorNumber, PasswordValidatorLower, PasswordValidatorUpper } from 'src/app/validators/password.validators';
import swal from'sweetalert2';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}


@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {
  email:string;
  password:string;
  formGroupCambiarContrasena: FormGroup;
  perfil_seleccion: FormControl;
  loading:boolean = false
  constructor(
    private router: Router,
    private formBuilderLogin: FormBuilder,
    private _loginService: LoginService,
    private localService: LocalService,
    private _storageService: StorageService
  ){
    this.perfil_seleccion = new FormControl("");
   }

  ngOnInit() {
    this.buildFormCambiarContrasena();
  }

  private buildFormCambiarContrasena(){
    this.formGroupCambiarContrasena = this.formBuilderLogin.group({
      actual_password:['', [
                            Validators.required
                          ]],
      new_password:['', [
                          Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(12),
                          PasswordValidatorNumber.strong, 
                          PasswordValidatorLower.strong, 
                          PasswordValidatorUpper.strong
                        ]],
      repeat_password:['',[
                            Validators.required
                          ]]
    },{
      validator: MustMatch('new_password', 'repeat_password')
    });
  }

  get f() { return this.formGroupCambiarContrasena.controls; }

  cambiarContrasena(){
    const formValue = this.formGroupCambiarContrasena.value
    this.loading=true;
    this._loginService.cambiarContrasena(formValue).subscribe((data)=>{
      this.loading=false;
      console.log(data)
      if(data['message']=="great"){
        swal.fire({
          type:"success",
          title:"Registro exitoso",
          text:"Se ha actualizado su contraseña correctamente",
          confirmButtonText: 'Aceptar',
        }).then((result)=>{
          this.loading = false;
          this.router.navigate(['/admin']);
        });
      }
      if(data['message']=="incorrect_password"){
        swal.fire({
          type:"error",
          title:"Registro erroneo",
          text:"Verifique su contraseña actual",
          confirmButtonText: 'Aceptar',
        }).then((result)=>{
          this.loading = false;
        });
      }
      if(data['message']=="error"){
        swal.fire({
          type:"error",
          title:"Registro erroneo",
          text:"Intentelo más tarde",
          confirmButtonText: 'Aceptar',
        }).then((result)=>{
          this.loading = false;
          this.router.navigate(['/admin']);
        });
      }
    },
    (error)=>{
      this.loading=false;
      swal.fire({
        type:"error",
        title:"Registro erroneo",
        text:error.error.message,
        confirmButtonText: 'Aceptar',
      }).then((result)=>{
        this.router.navigate(['/admin'])
      });
      console.log(error)
    });
  }

  getErrorMessageRepeatPassword(){
    return this.formGroupCambiarContrasena.get('repeat_password').hasError('required')
      ? 'Campo obligatorio.'
        : '';
  }

  getErrorMessageNewPassword(controlGroup:string,error:string){
    let list_error = {
      required: 'Campo obligatorio.',
      notNumber: 'Debe tener al menos un número.',
      notUpper: 'Debe tener al menos un mayúscula.',
      notLower: 'Debe tener al menos una minúscula.',
      minlength: 'Debe tener mas de 6 caracteres.',
      maxlength: 'Debe tener menos de 12 caracteres.'
    }
    if (this.formGroupCambiarContrasena.get(controlGroup).hasError(error)){
      return list_error[error];
    }
    else{
      return '';
    }
  }

  getErrorMessagePassword(){
    return this.formGroupCambiarContrasena.get('actual_password').hasError('required')
      ? 'Campo obligatorio.'
        : '';
  }

}
