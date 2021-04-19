import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutValidator } from 'ng2-rut';
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
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.css']
})
export class NuevoAlumnoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
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
    private rutValidator: RutValidator,
    private _cursoService: CursoService,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _colegioService: ColegioService,
    private _alumnoService: AlumnoService,
  ) { }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
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
    console.log(data);
    this._alumnoService.postAlumno(data,this.token).subscribe(
      (data:any)=>{
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
                  this.loading = true
                  var file = result3.value
                  var formData = new FormData()
                  formData.append('imagen',file)
                  this._alumnoService.uploadImage(formData, data['id'],this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      this.loading = false
                      swal.fire({
                        title: 'Registro exitoso',
                        text: 'Se ha guardado al alumno exitosamente!',
                        type: 'success',
                        confirmButtonColor: '#2dce89',
                      }).then((result)=>{
                        this.loading = false;
                        this.router.navigateByUrl('/admin/perfiles');
                      })
                    }
                    this.loading = false
                  })
                }
                else{
                  this.loading = true
                  this._alumnoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                    if(data['Response']=="exito"){
                      this.loading = false
                      swal.fire({
                        title: 'Registro exitoso',
                        text: 'Se ha guardado al alumno exitosamente!',
                        type: 'success',
                        confirmButtonColor: '#2dce89',
                      }).then((result)=>{
                        this.loading = false;
                        this.router.navigateByUrl('/admin/perfiles');
                      })
                    }
                  },
                  (error=>{}))
                  this.loading = false
                }
              })
            }
            else{
              this.loading = true
              this._alumnoService.uploadImageDefault(data['id'],this.token).subscribe((data:any)=>{
                if(data['Response']=="exito"){
                  this.loading = false
                  swal.fire({
                    title: 'Registro exitoso',
                    text: 'Se ha guardado al alumno exitosamente!',
                    type: 'success',
                    confirmButtonColor: '#2dce89',
                  }).then((result)=>{
                    this.loading = false;
                    this.router.navigateByUrl('/admin/perfiles');
                  })
                }
              },
              (error=>{}))
              this.loading = false
            }
          })
        }
    },
    (error)=>{this.loading = false})
  }

}
