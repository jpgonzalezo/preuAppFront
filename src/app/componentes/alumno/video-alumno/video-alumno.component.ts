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
  selector: 'app-video-alumno',
  templateUrl: './video-alumno.component.html',
  styleUrls: ['./video-alumno.component.css']
})
export class VideoAlumnoComponent implements OnInit {
  pageVideos: number;
  pageSizeVideos: number;
  collectionSizeVideos: number;
  videos: Video[];
  loadVideos: boolean = true;
  token: string;
  id_asignatura: string;
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
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.getVideos();

  }

  getVideos() {
    this.loadVideos = true;
    this._videoService.getVideosByAsignaturaAndCurso(this.token, this.id_asignatura).subscribe((data: Video[]) => {
      this.videos = data; 
      this.loadVideos = false;
      console.log(data);
      this.collectionSizeVideos = this.videos.length;
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
