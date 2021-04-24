import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProfesorService } from '../../../servicios/profesor.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';
import { AnotacionService } from 'src/app/servicios/anotacion.service';
import { Profesor } from 'src/app/modelos/profesor';
import { Asignatura } from 'src/app/modelos/asignatura.model';
import { Anotacion } from 'src/app/modelos/anotacion.model';
import swal from'sweetalert2';
import { environment } from 'src/environments/environment';
import { LocalService } from 'src/app/servicios/local.service';
@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html'
})
export class DetalleProfesorComponent implements OnInit {
  pageAnotacion: number;
  pageSizeAnotacion: number;
  collectionSizeAnotacion: number;
  id_profesor:string;
  profesor: Profesor;
  asignatura: Asignatura;
  anotaciones: Anotacion[];
  token: string
  loadingProfesor=true
  loadingObservaciones=true
  constructor(
    private _profesorService:ProfesorService, 
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _localService: LocalService,
    private _anotacionService: AnotacionService
  ) { 
    this.profesor= new Profesor()
    this.asignatura = new Asignatura()
    this.pageAnotacion = 1;
    this.pageSizeAnotacion = 4;
    this.anotaciones = []
  }

  ngOnInit() {
    if(this._storageService.getCurrentToken()==null){
      this.token = this._localService.getToken() 
    }
    else{
      this.token = this._storageService.getCurrentToken()
    }
    this.id_profesor=this._activatedRoute.snapshot.paramMap.get('id')
    this.getProfesor()
    this.getAnotaciones()
  }

  getProfesor(){
    this.loadingProfesor=true
    this._profesorService.getProfesor(this.id_profesor,this.token).subscribe((data:Profesor)=>{
      this.profesor = data
      this.profesor.imagen = environment.API_SERVER_URL+"/profesor_imagen/"+this.profesor.imagen
      this.asignatura = this.profesor.asignatura
      this.loadingProfesor=false
    })
  }

  getAnotaciones(){
    this.loadingObservaciones=true
    this._anotacionService.getAnotacionesProfesor(this.id_profesor,this.token).subscribe((data:Anotacion[])=>{
      this.anotaciones = data
      this.collectionSizeAnotacion = this.anotaciones.length
      this.loadingObservaciones=false
    })
  }

  public cancelar(){
    this.router.navigateByUrl('/admin/perfiles');
  }
  
  get anotaciones_tabla(): any[] {
    return this.anotaciones
      .map((anotacion, i) => ({id: i + 1, ...anotacion}))
      .slice((this.pageAnotacion - 1) * this.pageSizeAnotacion, (this.pageAnotacion - 1) * this.pageSizeAnotacion + this.pageSizeAnotacion);
  }
}
