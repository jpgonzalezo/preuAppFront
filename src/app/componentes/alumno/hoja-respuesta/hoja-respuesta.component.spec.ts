import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaRespuestaComponent } from './hoja-respuesta.component';

describe('HojaRespuestaComponent', () => {
  let component: HojaRespuestaComponent;
  let fixture: ComponentFixture<HojaRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
