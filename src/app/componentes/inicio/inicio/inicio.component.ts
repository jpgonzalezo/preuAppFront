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
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
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
      password:['', Validators.required],
      tipo:this.perfil_seleccion
    });
  }

  login(){
    const dataLogin = this.formGroupLogin.value;
    if(dataLogin['tipo']==""){
      swal.fire({
        title : 'Error Login',
        text: 'Debe seleccionar un tipo de usuario para iniciar sesión',
        type: 'error'
      })
    }
    else{
      this.loading = true
      this._loginService.login(dataLogin).subscribe((data:any)=>{
        if(data['respuesta']=='no_existe'){
          this.loading = false
          swal.fire({
            title : 'Error Login',
            text: 'Usuario no existe',
            type: 'error'
          })
        }
        else{
          this.correctLogin(data['tipo'])
        }
      },
      (error) =>{
        this.loading = false
        swal.fire({
          title : 'Error Login',
          text: 'Verifique sus credenciales',
          type: 'error'
        })
      }
      )
    }
  }

  private correctLogin(tipo:string){
    //this._storageService.setCurrentSession(data);
    //this.localService.setToken(this._storageService.getCurrentToken())
    if(tipo == 'ADMINISTRADOR'){
      this.loading = false
      this.router.navigate(['/admin']);
    }
    if(tipo == 'PROFESOR'){
      this.loading = false
      this.router.navigate(['/profesor']);
    }
    if(tipo == 'ALUMNO'){
      this.loading = false
      this.router.navigate(['/alumno']); 
    }
    if(tipo == 'APODERADO'){
      this.loading = false
      this.router.navigate(['/apoderado']); 
    }
  }
  cambiarPersona(tipo:string){
    this.persona = tipo;
    this.perfil_seleccion.setValue(tipo);
  }
  validateTipo(control: AbstractControl) {
    let error = true;
    var tipo = control.value
    if(tipo ==""){
      error = false
    }
    return error;
  }

  solicitaCodigo(){
    var id_prueba = ""
    swal.mixin({
      title: 'Nueva código',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1'],
      confirmButtonColor: '#2dce89',
      cancelButtonColor: '#fb6340',
    }).queue([
      {
        title: 'Email de usuario',
        text: 'Ingrese su correo con el que se registró',
        input: 'email',
        showCancelButton: true,
        onOpen: function (){
          swal.disableConfirmButton();
          swal.getInput().addEventListener('keyup', function(e) {
            if((<HTMLInputElement>event.target).value == "" || parseInt((<HTMLInputElement>event.target).value)<=0) {
              swal.disableConfirmButton();
            } 
            else {
              swal.enableConfirmButton();
            }
            })
        }
      }
    ]).then((result) => {
      if (result.dismiss==null) {
        this.loading = true
        console.log(result.value[0])
        const data = {
          email: result.value[0]
        }
        this._loginService.enviaCodigoRecuperacion(data).subscribe(
          (response) => {                           //Next callback
            console.log(response)
            this.loading = false
            swal.fire({
              title: 'Código generado con éxito',
              text: 'Revisa tu bandeja de correo',
              type: 'success',
              confirmButtonColor: '#2dce89',
            })
          },
          (error) => {             
            console.error(error._body)                 //Error callback
            console.error('error caught in component')
            swal.fire({
              title: 'Error en envio de código',
              text: error._body,
              type: 'error',
              confirmButtonColor: '#2dce89',
            })
            this.loading = false;
      
            //throw error;   //You can also throw the error to a global error handler
          }
       ) 
      }
    })
  }
}
