import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface Respuesta {
  numero_pregunta: number,
  alternativa: string
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
  radioValue: string='';
  preguntas: [];
  respuestas: Respuesta[];
  pageRespuesta: number;
  pageSizeRespuesta: number;
  collectionSizeRespuesta: number;
  headers: Header[]



  ngOnInit() {
    this.creaJsonRespuesta()
  }

  constructor() {
    this.respuestas = []
    this.pageRespuesta = 1
    this.pageSizeRespuesta = 10
    this.collectionSizeRespuesta = 70
    this.headers = [
      {
        text: "Nro Pregunta",
        value: "name"
      },
      { text: "A", value: "A" },
      { text: "B", value: "B" },
      { text: "C", value: "C" },
      { text: "D", value: "D" },
      { text: "E", value: "E" }
    ]
  }

  onRadioButtonClick(index, value){
    this.respuestas[index].alternativa = value
    //console.log(this.respuestas)
  }

  creaJsonRespuesta() {
    var preguntas = Array.from(Array(70).keys())
    //console.log(preguntas)
    var array = []
    var i = 0
    preguntas.forEach(function () {
      var json = {
        numero_pregunta: i + 1,
        alternativa: ""
      }
      array.push(json)
      i = i + 1
    });
    this.respuestas = array
    console.log(this.respuestas[1])
  }
  get respuestas_tabla(): any[] {
    return this.respuestas
      .map((respuesta, i) => ({ id: i, ...respuesta }))
      .slice((this.pageRespuesta - 1) * this.pageSizeRespuesta, (this.pageRespuesta - 1) * this.pageSizeRespuesta + this.pageSizeRespuesta);
  }

}
