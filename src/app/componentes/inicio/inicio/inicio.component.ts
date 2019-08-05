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
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  persona: string;
  email:string;
  password:string;
  formGroupLogin: FormGroup;
  perfil_seleccion: FormControl;
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
      this._loginService.login(dataLogin).subscribe((data:any)=>{
        if(data['respuesta']=='no_existe'){
          swal.fire({
            title : 'Error Login',
            text: 'Usuario no existe',
            type: 'error'
          })
        }
        else{
          this.correctLogin({token:data['token'],user: {tipo: data['tipo'] }}, data['tipo'])
        }
      },
      (error) =>{
        swal.fire({
          title : 'Error Login',
          text: 'Verifique sus credenciales',
          type: 'error'
        })
      }
      )
    }
  }

  private correctLogin(data: Session, tipo:string){
    this._storageService.setCurrentSession(data);
    this.localService.setToken(this._storageService.getCurrentToken())
    if(tipo == 'ADMINISTRADOR'){
      this.router.navigate(['/admin']);
    }
    if(tipo == 'PROFESOR'){
      this.router.navigate(['/profesor']);
    }
    if(tipo == 'ALUMNO'){
      this.router.navigate(['/alumno']); 
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
}
