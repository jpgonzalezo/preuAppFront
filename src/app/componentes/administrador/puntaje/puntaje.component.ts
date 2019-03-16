import { Component, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {

  dataset: any[] = Handsontable.helper.createSpreadsheetData(30, 30)
  constructor() { }

  ngOnInit() {
  }

}
