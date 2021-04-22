import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/servicios/local.service';
import { ObservacionService } from 'src/app/servicios/observacion.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';


@Component({
  selector: 'app-nueva-observacion-profesor',
  templateUrl: './nueva-observacion-profesor.component.html',
  styleUrls: ['./nueva-observacion-profesor.component.css']
})
export class NuevaObservacionProfesorComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  id_prefesor:string;
  id_asignatura:string;

  tipos = [
    { value: 'ANONIMO', viewValue: 'Si' },
    { value: 'NO_ANONIMO', viewValue: 'No' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _localService: LocalService,
    private _storageService: StorageService,
    private _activatedRoute: ActivatedRoute,
    private _observacionService: ObservacionService,
  ) { }

  ngOnInit() {
    this.id_prefesor = this._activatedRoute.snapshot.paramMap.get('id_profesor');
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.createForm = this.formBuilder.group({
      titulo: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
      contenido: ['',[Validators.required]],
    });
  }


  get f() { return this.createForm.controls; }


  getErrorMessageTitulo(){
    return this.createForm.get('titulo').hasError('required')
    ? 'Debe ingresar un título.'
      : '';
  }

  getErrorMessageContenido(){
    return this.createForm.get('contenido').hasError('required')
    ? 'Debe ingresar su observación.'
      : '';
  }

  getErrorMessageTipo(){
    return this.createForm.get('tipo').hasError('required')
    ? 'Seleccione si desea que su observación sea anónima.'
      : '';
  }

  guardarObservacion(){
    let data = this.createForm.value;
    data['profesor'] = this.id_prefesor;

    this.loading = true

    this._observacionService.postObservacionProfesor(this.id_prefesor,data, this.token).subscribe((data: any) => {
      if (data['Response'] == 'exito') {
        this.loading = false;
        swal.fire({
          title: 'Registro exitoso',
          text: 'Se ha registrado la nueva observación exitosamente!',
          type: 'success',
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          this.volver();
        })
      }

      if(data['Response']=='user_invalid'){
        this.loading = false;
        swal.fire({
          type:'error',
          title:'Error en el servidor',
          text:'Ocurrió un error en el servidor, intente más tarde',
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar',
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
      })
    })
  }

  volver(){
    this.router.navigateByUrl('/alumno/asignaturas/'+this.id_asignatura+'/detalle');
  }

}
