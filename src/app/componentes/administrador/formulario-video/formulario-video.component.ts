import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/servicios/curso.service';
import { VideoService } from 'src/app/servicios/video.service';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { Curso } from 'src/app/modelos/curso.model';
import { ValidatorLink } from 'src/app/validators/link.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-video',
  templateUrl: './formulario-video.component.html',
  styleUrls: ['./formulario-video.component.css']
})
export class FormularioVideoComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  token: string;
  cursos = [];
  cursoSelect = {};
  asignaturaSelect = {};
  asignaturas = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _cursoService: CursoService,
    private _videoService: VideoService,
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
      nombre: ['', [Validators.required]],
      uri: ['', [Validators.required, ValidatorLink.strong]],
      curso_id: ['', [Validators.required]],
      asignatura_id: ['', [Validators.required]],
    });
    this.getCursos();
  }

  getErrorMessage(campo, mensaje) {
    return this.createForm.get(campo).hasError('required')
      ? mensaje
      : '';
  }

  getErrorMessageYoutube(campo, mensaje) {
    return this.createForm.get(campo).hasError('notYoutube')
      ? mensaje
      : '';
  }

  getCursos() {
    this.loading = true;
    this._cursoService.getCursos(this.token).subscribe((cursos: Array<Curso>) => {
      cursos.forEach(element => {
        this.cursos.push({ value: element.id, viewValue: element.nombre, asignaturas: element.asignaturas })

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
    const data = this.createForm.value;
    this._videoService.addVideo(data, this.token).subscribe((data: any) => {

      this.loading = false;
      Swal.fire({
        type: 'success',
        title: 'Registro exitoso',
        text: 'Su video fue añadido correctamente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#5cb85c',
      }).then((result2) => {
        if (result2 || result2.dismiss) {
          this._router.navigateByUrl('/admin/videos')
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

  getAsignaturas() {
    let id = this.createForm.get('curso_id').value
    this.asignaturas = []
    let asignaturasCurso = this.cursos.find(curso => curso.value == id).asignaturas

    asignaturasCurso.forEach(element => {
      this.asignaturas.push({ value: element.id, viewValue: element.nombre })

    });
  }






}
