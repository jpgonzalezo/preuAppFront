import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/servicios/local.service';
import { ObservacionService } from 'src/app/servicios/observacion.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ValidatorNumber } from 'src/app/validators/number.validators';
import swal from'sweetalert2';

@Component({
  selector: 'app-nueva-observacion-alumno',
  templateUrl: './nueva-observacion-alumno.component.html',
  styleUrls: ['./nueva-observacion-alumno.component.css']
})
export class NuevaObservacionAlumnoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  id_hoja_vida:string;

  tipos = [
    { value: 'OBSERVACION_ADMINISTRADOR', viewValue: 'Administrador' },
    { value: 'OBSERVACION_PSICOLOGO', viewValue: 'Psicologo' },
    { value: 'OBSERVACION_PSICOPEDAGOGO', viewValue: 'Psicopedagogo' }
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
    this.id_hoja_vida = this._activatedRoute.snapshot.paramMap.get('id')
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.createForm = this.formBuilder.group({
      titulo: ['',[Validators.required]],
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

  
  guardarObservacion(){
    let data = this.createForm.value;
    data['alumno'] = this.id_hoja_vida;
    data['tipo'] = 'OBSERVACION_PROFESOR'

    this.loading = true

    this._observacionService.postObservacion(data, this.token).subscribe((data: any) => {
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
    this.router.navigateByUrl('/profesor/detalle/alumno/'+this.id_hoja_vida);
  }

}
