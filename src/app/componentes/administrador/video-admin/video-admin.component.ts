import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Curso } from 'src/app/modelos/curso.model';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { VideoService } from 'src/app/servicios/video.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

export interface Video {
  nombre: string,
  uri: string,
  curso: Curso,
  asignatura: Asignatura,
  fecha: string
}

@Component({
  selector: 'app-video-admin',
  templateUrl: './video-admin.component.html',
  styleUrls: ['./video-admin.component.css']
})
export class VideoAdminComponent implements OnInit {
  pageVideos: number;
  pageSizeVideos: number;
  collectionSizeVideos: number;
  videos: Video[];
  loadVideos: boolean = true;
  token: string;
  constructor(
    private _localService: LocalService,
    private _storageService: StorageService,
    private _videoService: VideoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.videos = []
    this.pageVideos = 1;
    this.pageSizeVideos = 5;
  }

  ngOnInit() {
    if (this._storageService.getCurrentToken() == null) {
      this.token = this._localService.getToken();
    }
    else {
      this.token = this._storageService.getCurrentToken();
    }
    this.getVideos();

  }

  getVideos() {
    this.loadVideos = true;
    this._videoService.getAllVideos(this.token).subscribe((data: Video[]) => {
      this.videos = data; 
      this.loadVideos = false;
      console.log(data);
      this.collectionSizeVideos = this.videos.length;
    })
  }

  deleteVideo(id:string){
    Swal.fire({
      title: '¿Desea eliminar este video?',
      text: "Estos cambios son irreversibles!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.dismiss){}
      if (result.value) {
        this._videoService.deleteVideo(id,this.token).subscribe((data:any)=>{
          if(data['Response']=="Video eliminado"){
            Swal.fire({
              type: 'success',
              title: 'Eliminación exitosa',
              text: 'Se ha eliminado el video correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#5cb85c',
            }).then((result2)=>{
              if(result2 || result2.dismiss){
                this.getVideos()
              }
            })
          }
        })
      }
    })
  }

  get videos_tabla(): Video[] {
    return this.videos
      .map((pendiente, i) => ({ id: i + 1, ...pendiente }))
      .slice((this.pageVideos - 1) * this.pageSizeVideos, (this.pageVideos - 1) * this.pageSizeVideos + this.pageSizeVideos);
  }

  navegarEnComponentes(path) {
    this._router.navigateByUrl(path);
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
