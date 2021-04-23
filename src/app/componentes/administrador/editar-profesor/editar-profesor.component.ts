import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Profesor } from 'src/app/modelos/profesor';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { LocalService } from 'src/app/servicios/local.service';
import { ProfesorService } from 'src/app/servicios/profesor.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  id_profesor: string;
  asignaturas = [];
  profesor:Profesor;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rutValidator: RutValidator,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _asignaturaService: AsignaturaService,
    private _profesorService: ProfesorService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id_profesor = this._activatedRoute.snapshot.paramMap.get('id');
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getProfesor();
    this.getAsignaturas();
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
      cas_dep_of: ['',[]],
      asignatura: ['',[Validators.required]],
    });
  }

  getProfesor(){
    this.loading = true;
    this._profesorService.getProfesor(this.id_profesor,this.token).subscribe((data:Profesor)=>{
      this.loading = false;
      this.profesor = data;
      this.createForm.get('nombres').setValue(this.profesor.nombres);
      this.createForm.get('apellido_paterno').setValue(this.profesor.apellido_paterno);
      this.createForm.get('apellido_materno').setValue(this.profesor.apellido_materno);
      this.createForm.get('rut').setValue(this.profesor.rut);
      this.createForm.get('telefono').setValue(this.profesor.telefono);
      this.createForm.get('email').setValue(this.profesor.email);
      this.createForm.get('calle').setValue(this.profesor.direccion.calle);
      this.createForm.get('numero').setValue(this.profesor.direccion.numero);
      this.createForm.get('comuna').setValue(this.profesor.direccion.comuna);
      this.createForm.get('cas_dep_of').setValue(this.profesor.direccion.cas_dep_of);
      this.createForm.get('asignatura').setValue(this.profesor.asignatura.id);
    },
    (error)=>{
      this.loading = false;
    });
  }
  public getAsignaturas(){
    this.loading = true
    this._asignaturaService.getAsignaturas(this.token).subscribe((asignaturas: Asignatura[])=>{

      asignaturas.forEach(element => {
        this.asignaturas.push({ value: element.id, viewValue:element.nombre })
      });
      this.loading = false;
    },(error)=>{
      this.loading  =false;
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
    ? 'Debe ingresar los nombres del profesor.'
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

  getErrorMessageAsignatura(){
    return this.createForm.get('asignatura').hasError('required')
      ? 'Debe seleccionar una asignatura.'
        : '';
  }

  guardarProfesor(){
    this.loading = true
    const data = this.createForm.value;
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('-','');
    this._profesorService.putProfesor(this.id_profesor,data,this.token).subscribe(
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
