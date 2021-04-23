import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { Administrador } from 'src/app/modelos/administrador.model';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-administrador',
  templateUrl: './editar-administrador.component.html',
  styleUrls: ['./editar-administrador.component.css']
})
export class EditarAdministradorComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  token: string;
  id_administrador:string;
  administrador:Administrador;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rutValidator: RutValidator,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _administradorService: AdministradorService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_administrador = this._activatedRoute.snapshot.paramMap.get('id');
    this.getAdministrador();
    this.createForm = this.formBuilder.group({
      nombres: ['',[Validators.required]],
      apellido_paterno: ['',[Validators.required]],
      apellido_materno: ['',[Validators.required]],
      rut: ['',[Validators.required, this.rutValidator]],
      telefono: ['',[Validators.required,ValidatorNumber.strong,Validators.maxLength(9)]],
      email:['',[Validators.required, Validators.email]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      comuna: ['',[Validators.required]],
      cas_dep_of: ['',[]]
    });
  }

  getAdministrador(){
    this.loading = true;
    this._administradorService.getAdministrador(this.id_administrador,this.token).subscribe((data:Administrador)=>{
      this.loading = false;
      this.administrador = data;
      this.createForm.get('nombres').setValue(this.administrador.nombres);
      this.createForm.get('apellido_paterno').setValue(this.administrador.apellido_paterno);
      this.createForm.get('apellido_materno').setValue(this.administrador.apellido_materno);
      this.createForm.get('rut').setValue(this.administrador.rut);
      this.createForm.get('telefono').setValue(this.administrador.telefono);
      this.createForm.get('email').setValue(this.administrador.email);
      this.createForm.get('calle').setValue(this.administrador.direccion.calle);
      this.createForm.get('numero').setValue(this.administrador.direccion.numero);
      this.createForm.get('comuna').setValue(this.administrador.direccion.comuna);
      this.createForm.get('cas_dep_of').setValue(this.administrador.direccion.cas_dep_of);
    },
    (error)=>{
      this.loading = false;
    })
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
    ? 'Debe ingresar los nombres del administrador.'
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

  guardarAdministrador(){
    this.loading = true
    const data = this.createForm.value;
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('-','');
    this._administradorService.putAdministrador(this.id_administrador,data,this.token).subscribe(
      (data:any)=>{
        if(data['Response']=="exito"){
          this.loading = false
          swal.fire({
            title: 'Registro exitoso',
            text: 'Se ha editado al profesor exitosamente!',
            type: 'success',
            confirmButtonColor: '#2dce89',
          }).then((result)=>{
            this.loading = false;
            this.router.navigateByUrl('/admin/perfiles');
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
