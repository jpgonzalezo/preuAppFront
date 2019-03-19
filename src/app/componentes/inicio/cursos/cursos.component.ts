import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

	@Input() content:any[];

  constructor() { }

  ngOnInit() {

  }

}
