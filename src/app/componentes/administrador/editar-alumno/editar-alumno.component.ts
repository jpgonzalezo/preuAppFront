import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
import { Alumno } from 'src/app/modelos/alumno.model';
import { Colegio } from 'src/app/modelos/colegio.model';
import { Curso } from 'src/app/modelos/curso.model';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { CursoService } from 'src/app/servicios/curso.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  id_alumno:string;
  alumno: Alumno;
  sexos = [
    { value: 'MASCULINO', viewValue: 'Masculino' },
    { value: 'FEMENINO', viewValue: 'Femenino' },
    { value: 'NO DEFINIDO', viewValue: 'Otro' }
  ];
  cursos = [];
  colegios = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private rutValidator: RutValidator,
    private _cursoService: CursoService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _colegioService: ColegioService,
    private _alumnoService: AlumnoService,
  ) { }

  ngOnInit() {
    this.id_alumno = this._activatedRoute.snapshot.paramMap.get('id');
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.getAlumno();
    this.getCursos();
    this.getColegios();
    this.createForm = this.formBuilder.group({
      nombres: ['',[Validators.required]],
      apellido_paterno: ['',[Validators.required]],
      apellido_materno: ['',[Validators.required]],
      rut: ['',[Validators.required, this.rutValidator]],
      puntaje_ingreso: ['',[ Validators.required,ValidatorNumber.strong]],
      sexo: ['',[Validators.required]],
      telefono: ['',[Validators.required,ValidatorNumber.strong,Validators.maxLength(9)]],
      email:['',[Validators.required, Validators.email]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      comuna: ['',[Validators.required]],
      cas_dep_of: ['',[]],
      curso: ['',[Validators.required]],
      colegio: ['',[Validators.required]],
    });
  }

  getAlumno(){
    this.loading = true
    this._alumnoService.getAlumnoId(this.id_alumno,this.token).subscribe((data:Alumno)=>{
      this.loading = false
      this.alumno = data;
      this.createForm.get('nombres').setValue(this.alumno.nombres);
      this.createForm.get('apellido_paterno').setValue(this.alumno.apellido_paterno);
      this.createForm.get('apellido_materno').setValue(this.alumno.apellido_materno);
      this.createForm.get('rut').setValue(this.alumno.rut);
      this.createForm.get('puntaje_ingreso').setValue(this.alumno.puntaje_ingreso);
      this.createForm.get('sexo').setValue(this.alumno.sexo);
      this.createForm.get('telefono').setValue(this.alumno.telefono);
      this.createForm.get('email').setValue(this.alumno.email);
      this.createForm.get('calle').setValue(this.alumno.direccion.calle);
      this.createForm.get('numero').setValue(this.alumno.direccion.numero);
      this.createForm.get('comuna').setValue(this.alumno.direccion.comuna);
      this.createForm.get('cas_dep_of').setValue(this.alumno.direccion.cas_dep_of);
      this.createForm.get('curso').setValue(this.alumno.curso.id);
      this.createForm.get('colegio').setValue(this.alumno.colegio.id);
    },
    (error)=>{
      this.loading = false
    })
  }

  getCursos(){
    this.loading = true;
    this._cursoService.getCursos(this.token).subscribe((cursos: Array<Curso>)=>{
      cursos.forEach(element => {
        this.cursos.push({ value:element.id, viewValue:element.nombre })
      });
      this.loading = false;
    },
    (error)=>{
      this.loading = false;
    });
  }

  getColegios(){
    this.loading = true
    this._colegioService.getColegios(this.token).subscribe((colegios: Array<Colegio>)=>{
      colegios.forEach(element => {
        this.colegios.push({ value: element.id, viewValue: element.nombre })
      });
      this.loading = false;
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

  getErrorMessageCurso(){
    return this.createForm.get('curso').hasError('required')
      ? 'Debe seleccionar un curso.'
        : '';
  }

  getErrorMessageColegio(){
    return this.createForm.get('curso').hasError('required')
      ? 'Debe seleccionar un colegio.'
        : '';
  }


  guardarAlumno(){
    this.loading = true
    const data = this.createForm.value;
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('.','');
    data['rut']= data['rut'].replace('-','');
    this._alumnoService.putAlumno(this.id_alumno,data,this.token).subscribe(
      (data:any)=>{
        if(data['Response']=="exito"){
          this.loading = false
          swal.fire({
            title: 'Registro exitoso',
            text: 'Se ha editado al alumno exitosamente!',
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
