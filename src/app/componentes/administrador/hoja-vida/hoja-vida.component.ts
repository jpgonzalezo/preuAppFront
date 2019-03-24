import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {Alumno,ALUMNO_DATA} from '../../../modelos/alumno.model';
import {Anotacion, ANOTACION_DATA} from '../../../modelos/anotacion'
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  @Input()
  id_alumno:number;

  constructor() { }

  ngOnInit() {

  }

}
