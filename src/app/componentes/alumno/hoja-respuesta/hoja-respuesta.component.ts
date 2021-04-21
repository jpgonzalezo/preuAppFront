import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/servicios/local.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { EvaluacionService } from 'src/app/servicios/evaluacion.service';
import Swal from 'sweetalert2';


export interface Respuesta {
  numero_pregunta: number,
  alternativa: string,
  opciones: boolean[]
}

export interface Header {
  text: string,
  value: string
}

@Component({
  selector: 'app-hoja-respuesta',
  templateUrl: './hoja-respuesta.component.html',
  styleUrls: ['./hoja-respuesta.component.css']
})

export class HojaRespuestaComponent implements OnInit {
  radioValue: string = '';
  loading: boolean = false;
  token: string;
  id_asignatura: string;
  id_prueba: string;
  preguntas: [];
  respuestas: Respuesta[];
  pageRespuesta: number;
  pageSizeRespuesta: number;
  collectionSizeRespuesta: number;
  headers: Header[]
  opciones = []
  resp_opcion = [
    'A',
    'B',
    'C',
    'D',
    'E'
  ]

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _storageService: StorageService,
    private _localService: LocalService,
    private _evaluacionService: EvaluacionService) {
    this.respuestas = []
    this.pageRespuesta = 1
    this.pageSizeRespuesta = 10
    //TODO: cambiar a prueba.length
    this.collectionSizeRespuesta = 79
    this.headers = [
      {
        text: "Pregunta",
        value: "name"
      },
      { text: "A", value: "A" },
      { text: "B", value: "B" },
      { text: "C", value: "C" },
      { text: "D", value: "D" },
      { text: "E", value: "E" }
    ]
  }

  ngOnInit() {
    if (this._storageService.getCurrentToken() == null) {
      this.token = this._localService.getToken()
    }
    else {
      this.token = this._storageService.getCurrentToken()
    }
    this.id_asignatura = this._activatedRoute.snapshot.paramMap.get('id');
    this.id_prueba = this._activatedRoute.snapshot.paramMap.get('id_prueba');
    this.creaJsonRespuesta();
  }

  cambiarPregunta(numero_pregunta: number, j: number) {
    this.respuestas.forEach(respuesta => {
      if (respuesta.numero_pregunta == numero_pregunta) {
        if (respuesta.opciones[j]) {
          respuesta.opciones[j] = !respuesta.opciones[j];
          respuesta.alternativa = '';
        }
        else {
          respuesta.opciones = [false, false, false, false, false];
          respuesta.opciones[j] = true;
          respuesta.alternativa = this.resp_opcion[j];
        }
      }
    });
  }

  creaJsonRespuesta() {
    let preguntas = Array.from(Array(this.collectionSizeRespuesta).keys())
    //console.log(preguntas)
    let array = []
    let i = 0
    preguntas.forEach(function () {
      let json = {
        numero_pregunta: i + 1,
        alternativa: "",
        opciones: [false, false, false, false, false]
      }
      array.push(json)
      i = i + 1
    });
    this.respuestas = array
  }
  get respuestas_tabla(): any[] {
    return this.respuestas
      .map((respuesta, i) => ({ id: i, ...respuesta }))
      .slice((this.pageRespuesta - 1) * this.pageSizeRespuesta, (this.pageRespuesta - 1) * this.pageSizeRespuesta + this.pageSizeRespuesta);
  }


  enviarRespuestas() {
    this.loading = true;
    let dict = {};
    this.respuestas.forEach((element) => {
      dict[element.numero_pregunta] = element.alternativa;
    })
    let body = {
      //prueba_id: this.id_prueba,
      prueba_id: "6078e1aa30d0053938d69a12",
      respuestas: dict
    }
    this._evaluacionService.responderAutoevaluacion(body, this.token).subscribe(
      (data) => {
        console.log(data)
        if (data["Response"] == "exito") {
          Swal.fire({
            type: 'success',
            title: 'Registro exitoso',
            text: 'Sus respuestas han sido almacenadas correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#5cb85c',
          }).then((result2) => {
            if (result2 || result2.dismiss) {
              this._router.navigateByUrl('/alumno/asignaturas/' + this.id_asignatura + '/detalle')
            }
          })
        }
      },
      (error) => {
        Swal.fire({
          type: 'error',
          title: 'Error en el servidor',
          text: 'Ocurrió un error en el servidor, intente más tarde',
          confirmButtonColor: '#5cb85c',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result || result.dismiss) {
            this.loading = false
          }
        })
      },
      () => { this.loading = false });
  }

  volver() {
    this._router.navigateByUrl('/alumno/asignaturas/' + this.id_asignatura + '/detalle');
  }

}
