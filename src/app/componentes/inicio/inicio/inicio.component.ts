import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
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
          this.correctLogin({token:data['tipo'],user:
            { nombres:data['respuesta'].nombres,
              apellido_paterno:data['respuesta'].apellido_paterno,
              apellido_materno:data['respuesta'].apellido_materno,
              email:data['respuesta'].email,
              telefono:data['respuesta'].telefono,
              id:data['respuesta'].id,
            }
          })
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

  private correctLogin(data: Session){
    this._storageService.setCurrentSession(data);
    if(data['token']=="ADMINISTRADOR"){
      this.router.navigate(['/admin']);
    }
    else if(data['token']=="PROFESOR"){
      this.router.navigate(['/profesor']);
    }
    else if(data['token']=="ALUMNO"){
      console.log("sup")
      this.router.navigate(['/alumno']);
    }
    else{
      this.router.navigate(['/inicio']);
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
