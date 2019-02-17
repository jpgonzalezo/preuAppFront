import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaVidaComponent } from './hoja-vida.component';

describe('HojaVidaComponent', () => {
  let component: HojaVidaComponent;
  let fixture: ComponentFixture<HojaVidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaVidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
