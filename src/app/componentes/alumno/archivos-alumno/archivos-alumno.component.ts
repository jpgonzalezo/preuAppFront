import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { ArchivoService } from 'src/app/servicios/archivo.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';


export interface Archivo {
  nombre: string,
  path: string,
  asignatura: Asignatura,
  fecha: string,
  id: string
}

@Component({
  selector: 'app-archivos-alumno',
  templateUrl: './archivos-alumno.component.html',
  styleUrls: ['./archivos-alumno.component.css']
})
export class ArchivosAlumnoComponent implements OnInit {
  pageArchivos: number;
  id_asignatura: string = "";
  pageSizeArchivos: number;
  collectionSizeArchivos: number;
  archivos: Archivo[];
  loadArchivos: boolean = true;
  token: string;
  constructor(
    private _localService: LocalService,
    private _storageService: StorageService,
    private _archivoService: ArchivoService,
    private sanitizer: DomSanitizer,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this.archivos = []
    this.pageArchivos = 1;
    this.pageSizeArchivos = 5;
  }

  ngOnInit() {
    if (this._storageService.getCurrentToken() == null) {
      this.token = this._localService.getToken();
    }
    else {
      this.token = this._storageService.getCurrentToken();
    }

    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.getArchivos();

  }

  getArchivos() {
    this.loadArchivos = true;
    this._archivoService.getArchivoByAsignaturaAlumno(this.token, this.id_asignatura).subscribe((data: any[]) => {
      this.archivos = data;
      this.loadArchivos = false;
      this.collectionSizeArchivos = this.archivos.length;
    })
  }

  get archivos_tabla(): any[] {
    return this.archivos
      .map((pendiente, i) => ({ id: i + 1, ...pendiente }))
      .slice((this.pageArchivos - 1) * this.pageSizeArchivos, (this.pageArchivos - 1) * this.pageSizeArchivos + this.pageSizeArchivos);
  }

  navegarEnComponentes(path) {
    this._router.navigateByUrl(path);
  }

  deleteArchivo(id: string) {
    Swal.fire({
      title: '¿Desea eliminar este archivo?',
      text: "!Estos cambios son irreversibles!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.dismiss) { }
      if (result.value) {
        this._archivoService.deleteArchivo(id, this.token).subscribe((data: any) => {
          if (data['Response'] == "Archivo eliminado") {
            Swal.fire({
              type: 'success',
              title: 'Eliminación exitosa',
              text: 'Se ha eliminado el archivo correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2) => {
              if (result2 || result2.dismiss) {
                this.getArchivos()
              }
            })
          }
        })
      }
    })
  }

  downloadArchivo(archivo: Archivo) {
    this._archivoService.getArchivoById(this.token, archivo.id).subscribe((response: any) => {
      console.log(response)
      const url = window.URL.createObjectURL(
        new Blob([response])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", archivo.nombre); //or any other extension
      document.body.appendChild(link);
      link.click();
    })

  }
}

