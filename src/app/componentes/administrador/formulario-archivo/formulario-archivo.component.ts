import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/servicios/asignatura.service';
import { ArchivoService } from 'src/app/servicios/archivo.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { FileValidator } from 'src/app/validators/file.validators';
import Swal from 'sweetalert2';
import { Asignatura } from '@modelos/asignatura.model';

@Component({
  selector: 'app-formulario-archivo',
  templateUrl: './formulario-archivo.component.html',
  styleUrls: ['./formulario-archivo.component.css']
})
export class FormularioArchivoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  asignaturaSelect = {};
  asignaturas = [];
  selectedFiles: File = null;
  allowedExtensions = ['docx', 'xlsx', 'pdf'];



  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _asignaturaService: AsignaturaService,
    private _archivoService: ArchivoService,
    private _localService: LocalService,
    private _storageService: StorageService,
  ) { }


  ngOnInit() {
    if (this._storageService.getCurrentToken() == null) {
      this.token = this._localService.getToken()
    }
    else {
      this.token = this._storageService.getCurrentToken()
    }
    this.createForm = this.formBuilder.group({
      file: ['', [FileValidator.fileExtensions(this.allowedExtensions)]],
      asignatura_id: ['', [Validators.required]],
    });
    this.getAsignaturas();
  }

  getErrorMessage(campo, mensaje) {
    return this.createForm.get(campo).hasError('required')
      ? mensaje
      : '';
  }

  selectFile(event) {
    this.selectedFiles = event.target.files[0];
  }

  getErrorMessageYoutube(campo, mensaje) {
    return this.createForm.get(campo).hasError('notYoutube')
      ? mensaje
      : '';
  }

  getAsignaturas() {
    this.loading = true;
    this._asignaturaService.getAsignaturas(this.token).subscribe((cursos: Array<Asignatura>) => {
      cursos.forEach(element => {
        this.asignaturas.push({ value: element.id, viewValue: element.nombre})

      });
      this.loading = false;
    },
      (error) => {
        this.loading = false;
      });
  }

  volver() {
    this._router.navigateByUrl('/admin/videos');
  }

   addVideo() {
    this.loading = true;
    const file = this.selectedFiles;
    console.log(this.selectedFiles)
    var id_asignatura = this.createForm.value.asignatura_id
    this._archivoService.addArchivoByAsignatura(this.token, id_asignatura,file).subscribe((data: any) => {

      this.loading = false;
      Swal.fire({
        type: 'success',
        title: 'Registro exitoso',
        text: 'Su Archivo fue añadido correctamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#5cb85c',
      }).then((result2) => {
        if (result2 || result2.dismiss) {
          this._router.navigateByUrl('/admin/archivos')
        }
      })
    },
      (error) => {
        Swal.fire({
          type: 'error',
          title: 'Error en el servidor',
          text: 'Ocurrió un error en el servidor, intente más tarde',
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar',
        }).then((result2) => {
          if (result2 || result2.dismiss) {
            this.loading = false;

          }
        })
      });
  } 


}
