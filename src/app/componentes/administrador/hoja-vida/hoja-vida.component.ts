import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlumnoService } from '../../../servicios/alumno.service';
import { JustificacionService } from 'src/app/servicios/justificacion.service';
import { ObservacionService } from '../../../servicios/observacion.service';
import { AdministradorCompartidoService } from '../administrador.compartido.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/servicios/storage.service';
import { Justificacion } from 'src/app/modelos/justificacion.model';
import swal from'sweetalert2';
import { Config } from 'src/app/config';
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  pageAdministrador: number;
  pageProfesor: number;
  pagePsicologo: number;
  pageJustificacion: number;
  pageSizeJustificacion: number;
  pageSizeObservacionAdministrador: number;
  collectionSizeObservacionAdministrador: number;
  pageSizeObservacionProfesor: number;
  collectionSizeJustificacion: number;
  collectionSizeObservacionProfesor: number;
  pageSizeObservacionPsicologo: number;
  collectionSizeObservacionPsicologo: number;
  observaciones_admin:any
  observaciones_profe:any
  observaciones_psico:any
  hoja_vida:any;
  id_hoja_vida:string;
  justificaciones: Justificacion[];
  constructor(private _alumnoService:AlumnoService, 
    private _observacionService: ObservacionService,
    private _administradorCompartidoService: AdministradorCompartidoService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService,
    private _justificacionService: JustificacionService
    ) {
    this.hoja_vida=[]
    this.observaciones_admin = []
    this.observaciones_profe = []
    this.observaciones_psico = []
    this.justificaciones = []
    this.pageAdministrador = 1;
    this.pageProfesor = 1;
    this.pagePsicologo = 1;
    this.pageJustificacion = 1;
    this.pageSizeObservacionAdministrador = 4;
    this.pageSizeObservacionProfesor = 4;
    this.pageSizeObservacionPsicologo = 4;
    this.pageSizeJustificacion = 4;
  }

  ngOnInit() {
    this.id_hoja_vida=this._activatedRoute.snapshot.paramMap.get('id')
    this.getHojaVida(this.id_hoja_vida);
    this.getObservacionesAdministrador()
    this.getObservacionesProfesor()
    this.getObservacionesPsicologo()
    this.getJustificaciones()
  }

  public getHojaVida(id:string){
  	this._alumnoService.getHojaVida(id).subscribe((data: Array<any>) => {
      this.hoja_vida = data;
      this.hoja_vida.imagen = Config.API_SERVER_URL+"/alumno_imagen/"+this.hoja_vida.imagen
    });
  }

  public getObservacionesAdministrador(){
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_ADMINISTRADOR').subscribe(
      (data:any)=>{
        this.observaciones_admin = data
        this.collectionSizeObservacionAdministrador = this.observaciones_admin.length
      })
  }

  public getObservacionesProfesor(){
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_PROFESOR').subscribe(
      (data:any)=>{
        this.observaciones_profe = data
        this.collectionSizeObservacionProfesor = this.observaciones_profe.length
      }
    )
  }

  public getObservacionesPsicologo(){
    this._observacionService.getObservacionesAlumno(this.id_hoja_vida, 'OBSERVACION_PSICOLOGO').subscribe(
      (data:any)=>{
        this.observaciones_psico = data
        this.collectionSizeObservacionPsicologo = this.observaciones_psico.length
      }
    )
  }

  public getJustificaciones(){
    this._justificacionService.getJustificacionesAlumno(this.id_hoja_vida).subscribe((data: Justificacion[])=>{
      this.justificaciones = data
      console.log(data)
      this.collectionSizeJustificacion = this.justificaciones.length
    })
  }


  get observaciones_administrador_tabla(): any[] {
    return this.observaciones_admin
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador, (this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador + this.pageSizeObservacionAdministrador);
  }

  get justificaciones_tabla(): Justificacion[] {
    return this.justificaciones
      .map((justificacion, i) => ({id: i + 1, ...justificacion}))
      .slice((this.pageJustificacion - 1) * this.pageSizeJustificacion, (this.pageJustificacion - 1) * this.pageSizeJustificacion + this.pageSizeJustificacion);
  }

  get observaciones_psicologo_tabla(): any[] {
    return this.observaciones_psico
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pagePsicologo - 1) * this.pageSizeObservacionPsicologo, (this.pagePsicologo - 1) * this.pageSizeObservacionPsicologo + this.pageSizeObservacionPsicologo);
  }

  get observaciones_profesor_tabla(): any[] {
    return this.observaciones_profe
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pageProfesor - 1) * this.pageSizeObservacionProfesor, (this.pageProfesor - 1) * this.pageSizeObservacionProfesor + this.pageSizeObservacionProfesor);
  }

  public cancelar(){
    this.router.navigateByUrl('/admin/perfiles');
  }

  public modalNuevaObservacion(){
    swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Tipo de observación',
        input: 'select',
        inputOptions: {
          'OBSERVACION_ADMINISTRADOR': 'Administrador',
          'OBSERVACION_PSICOLOGO': 'Psicologo',
        },
        inputPlaceholder: 'Seleccione un tipo',
      },
      {
        title: 'Título Observación',
        input: 'text',
        inputPlaceholder: 'Ingrese un título...',
      },
      {
        title: 'Observación',
        input: 'textarea',
        inputPlaceholder: 'Ingrese su observación aquí...',
      }
    ]).then((result) => {
      if (result.value) {
        if(result.value[0]=="" || result.value[1]=="" || result.value[2]=="" ){
          swal.fire({
            title: 'Error',
            type: 'error',
            text : 'Debe completar todos los campos para realizar una observación'
          }).then((result)=>{
            if(result){
              this.modalNuevaObservacion();
            }
          })
        }
        else{
          this._storageService.getCurrentUser().nombres
          var usuario = this._storageService.getCurrentUser().nombres+" "+this._storageService.getCurrentUser().apellido_paterno+" "+this._storageService.getCurrentUser().apellido_materno
          this._observacionService.postObservacion(
            { 'alumno': this.id_hoja_vida,
              'tipo':result.value[0],
              'titulo':result.value[1],
              'contenido':result.value[2],
              'nombre_personal': usuario
            }
          ).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha registrado una nueva observación exitosamente!',
                type: 'success'
              }).then((result)=>{
                if(result){
                  this.getObservacionesAdministrador();
                  this.getObservacionesProfesor();
                  this.getObservacionesPsicologo();
                }
              })
            }
          })
        }
      }
    })
  }
}
