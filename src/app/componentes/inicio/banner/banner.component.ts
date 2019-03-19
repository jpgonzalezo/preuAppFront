import { Component, OnInit, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

	//content_aux:any[];
	afterInit:boolean = false;
	@Input() content:any[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  	this.afterInit = true;
  }
}
