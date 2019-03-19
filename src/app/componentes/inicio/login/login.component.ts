import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroupLogin: FormGroup;
  constructor( private loginService: LoginService,
               private formBuilderLogin: FormBuilder ) { }

  ngOnInit() {
    this.buildForm()
  }

  public logearse(){
    const usuario = this.formGroupLogin.value
    this.loginService.login({'data':{'nombre_usuario':usuario.nombre_usuario,'password':usuario.password}}).subscribe(
      res=>{
        console.log(res)
      }
    )
  }

  public buildForm(){
    this.formGroupLogin = this.formBuilderLogin.group({
      nombre_usuario:[""],
      password: [""]
    })
  }
}
