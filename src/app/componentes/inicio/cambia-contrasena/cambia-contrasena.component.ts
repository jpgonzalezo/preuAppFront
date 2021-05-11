import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Session } from 'src/app/modelos/session.model';
import swal from'sweetalert2';
@Component({
  selector: 'app-cambia-contrasena',
  templateUrl: './cambia-contrasena.component.html'
})
export class CambiaContrasenaComponent implements OnInit {
  persona: string;
  email:string;
  password:string;
  formGroupLogin: FormGroup;
  perfil_seleccion: FormControl;
  loading:boolean = false
  constructor(private router: Router,
    private formBuilderLogin: FormBuilder,
    private _loginService: LoginService,
    private localService: LocalService,
    private _storageService: StorageService) { 
    this.persona = "Seleccione perfil";
    this.perfil_seleccion = new FormControl("");
  }

  ngOnInit() {
    this.buildFormLogin();
  }

  private buildFormLogin(){
    this.formGroupLogin = this.formBuilderLogin.group({
      email:['', Validators.required],
      codigo:['', Validators.required],
      new_pass: ['', Validators.required],
      new_pass2: ['', Validators.required],
      tipo:this.perfil_seleccion
    });
  }

  login(){
    const dataLogin = this.formGroupLogin.value;
    if(dataLogin['new_pass'] != dataLogin['new_pass2']){
      swal.fire({
        title : 'Error',
        text: 'Las nueva contraseña no coinciden',
        type: 'error'
      })
    }
    else{
      this.loading = true
      this._loginService.renuevaContrasena(dataLogin).subscribe(
        (response) => {                           //Next callback
          console.log(response)
          this.loading = false
          swal.fire({
            title: 'Éxito',
            text: 'Su contraseña se actualizó correctamente',
            type: 'success',
            confirmButtonColor: '#2dce89',
          })
          this.router.navigate(['/inicio']);
        },
        (error) => {             
          console.error(error._body)                 //Error callback
          console.error('error caught in component')
          swal.fire({
            title: 'Error al actualizar contraseña',
            text: error._body,
            type: 'error',
            confirmButtonColor: '#2dce89',
          })
          this.loading = false;
    
          //throw error;   //You can also throw the error to a global error handler
        }
     ) 
 
      
    }
  }


}
