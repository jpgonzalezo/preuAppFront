import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit {

  @Input() content:any[];
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $("#rev_slider_1").show().revolution({
      delay: 5000,
      sliderLayout: 'fullwidth',
      sliderType:'standard',
      responsiveLevels: [1171, 1025, 769, 480],
      gridwidth: [1171, 1025, 769, 480],
      gridheight: [560, 500, 450, 350],
  
      /* basic navigation arrows and bullets */
      navigation: {
        arrows: {
        enable: true,
        style: 'hesperiden',
        hide_onleave: false
        },
  
        bullets: {
        enable: false,
        style: 'hesperiden',
        hide_onleave: false,
        h_align: 'center',
        v_align: 'bottom',
        h_offset: 0,
        v_offset: 20,
        space: 5
        }
      },
      disableProgressBar:'on'
    });
  
  }

}
