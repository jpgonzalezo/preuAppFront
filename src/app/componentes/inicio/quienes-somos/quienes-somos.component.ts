import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
   styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

	@Input() content:any[];
	seccion:any;

  constructor() { }

  ngOnInit() {

  	this.setSeccion();
  }

  public setSeccion(){
  	for(var i = 0; i < this.content.length; i++){
  		if(this.content[i].tipo === 'QUIENES_SOMOS') {
  			this.seccion = this.content[i];
  			break;
  		}
  	}
  }

}
