import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {NgForm} from '@angular/forms';

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
  radioValue: string='';
  preguntas: [];
  respuestas: Respuesta[];
  pageRespuesta: number;
  pageSizeRespuesta: number;
  collectionSizeRespuesta: number;
  headers: Header[]
  respuestasForm: FormGroup;
  selectedHobbies: [string];
  opciones = []
  resp_opcion = [
    'A',
    'B',
    'C',
    'D',
    'E'
  ]


  ngOnInit() {
    this.creaJsonRespuesta();
  }



  constructor() {
    this.respuestas = []
    this.pageRespuesta = 1
    this.pageSizeRespuesta = 10
    this.collectionSizeRespuesta = 70
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

  test(i:number,j:number){
    if(this.respuestas[i].opciones[j]){
      this.respuestas[i].opciones[j] = !this.respuestas[i].opciones[j];
      this.respuestas[i].alternativa = '';
    }
    else{
      this.respuestas[i].opciones = [false,false,false,false,false];
      this.respuestas[i].opciones[j] = true;
      this.respuestas[i].alternativa = this.resp_opcion[j];

    }
    
    console.log(this.respuestas[i])
  }

  createFormInputs() {
    this.respuestasForm = new FormGroup({
      respuestas: this.createRespuesta(this.respuestas)
    });

    console.log(this.respuestasForm.value)

  }

  createRespuesta(respuestas) {
    const arr = respuestas.map(respuesta => {
      return new FormControl(respuesta.alternativa || "");
    });
    return new FormArray(arr);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
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
        alternativa: "",
        opciones:[false,false,false,false,false]
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
