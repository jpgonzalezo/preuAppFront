import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  @Input() contant:any[];

  constructor() { }

  ngOnInit() {
  }

}
