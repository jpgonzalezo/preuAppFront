import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

	@Input() content:any[];
	seccion:any;

  constructor() { }

  ngOnInit() {
  	this.setSeccion()
  }

  public setSeccion(){
  	for(var i = 0; i < this.content.length; i++){
  		if(this.content[i].tipo === 'CONTACTO')
  		{
  			this.seccion = this.content[i];
  			break;
  		}
  	}
  }

}
