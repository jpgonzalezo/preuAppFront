import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {AlumnoService} from '../../../servicios/alumno.service';
import {ObservacionService} from '../../../servicios/observacion.service';
import swal from'sweetalert2';
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  pageAdministrador: number;
  pageProfesor: number;
  pagePsicologo: number;
  pageSizeObservacionAdministrador: number;
  collectionSizeObservacionAdministrador: number;
  pageSizeObservacionProfesor: number;
  collectionSizeObservacionProfesor: number;
  pageSizeObservacionPsicologo: number;
  collectionSizeObservacionPsicologo: number;
  observaciones_admin:any
  observaciones_profe:any
  observaciones_psico:any
  hoja_vida:any;

  @Input()
  id_hoja_vida:string;
  @Output()
  guardado_exitoso = new EventEmitter<any>()
  
  constructor(private _alumnoService:AlumnoService, private _observacionService: ObservacionService) {
    this.hoja_vida=[]
    this.observaciones_admin = []
    this.observaciones_profe = []
    this.observaciones_psico = []
    this.pageAdministrador = 1;
    this.pageProfesor = 1;
    this.pagePsicologo = 1;
    this.pageSizeObservacionAdministrador = 4;
    this.pageSizeObservacionProfesor = 4;
    this.pageSizeObservacionPsicologo = 4;
  }

  ngOnInit() {
    this.getHojaVida(this.id_hoja_vida);
    this.getObservacionesAdministrador()
    this.getObservacionesProfesor()
    this.getObservacionesPsicologo()
  }
  public getHojaVida(id:string){
  	this._alumnoService.getHojaVida(id).subscribe((data: Array<any>) => {
      this.hoja_vida = data;
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
  get observaciones_administrador_tabla(): any[] {
    return this.observaciones_admin
      .map((observacion, i) => ({id: i + 1, ...observacion}))
      .slice((this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador, (this.pageAdministrador - 1) * this.pageSizeObservacionAdministrador + this.pageSizeObservacionAdministrador);
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
    this.guardado_exitoso.emit("perfiles");
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
          this._observacionService.postObservacion(
            { 'alumno': this.id_hoja_vida,
              'tipo':result.value[0],
              'titulo':result.value[1],
              'contenido':result.value[2], 
              'nombre_personal': 'Carolina Pavez'
            }
          ).subscribe((data:any)=>{
            if(data['Response']=='exito'){
              swal.fire({
                title: 'Registro exitoso',
                text: 'Se ha registrado una nueva observación exitosamente!',
                type: 'success'
              }).then((result)=>{
                if(result){
                  this.getObservacionesAdministrador()
                }
              })
            }
          })
        }
      }
    })
  }
}
