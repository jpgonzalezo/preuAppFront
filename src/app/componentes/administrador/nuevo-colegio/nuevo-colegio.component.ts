import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColegioService } from 'src/app/servicios/colegio.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-colegio',
  templateUrl: './nuevo-colegio.component.html',
  styleUrls: ['./nuevo-colegio.component.css']
})
export class NuevoColegioComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _colegioService: ColegioService
  ) { }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.createForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      calle: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      comuna: ['',[Validators.required]]
    });
  }

  get f() { return this.createForm.controls; }

  getErrorMessageNombre(){
    return this.createForm.get('nombre').hasError('required')
    ? 'Debe ingresar el nombre del colegio.'
      : '';
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

  guardarColegio(){
    this.loading = true
    let data = this.createForm.value;
    this.loading = true;

    this._colegioService.postColegio(data,this.token).subscribe((data:any)=>{
        if(data['Response']=='exito'){
          this.loading = false;
          Swal.fire({
            type:'success',
            title:'Registro Exitoso',
            text:'Se ha creado el colegio exitosamente',
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Aceptar',
          }).then((result)=>{
            this.loading = false;
            this.router.navigateByUrl('/admin/colegios');
          })
        }
      },
    (error)=>{
      this.loading = false;
      Swal.fire({
        type:'error',
        title:'Error en el servidor',
        text:'Ocurrió un error en el servidor, intente más tarde',
        confirmButtonColor: '#5cb85c',
        confirmButtonText: 'Aceptar',
      })
    })
  }

  volver(){
    this.router.navigateByUrl('/admin/colegios');
  }

}
