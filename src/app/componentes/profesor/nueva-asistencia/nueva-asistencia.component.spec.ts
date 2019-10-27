import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAsistenciaComponent } from './nueva-asistencia.component';

describe('NuevaAsistenciaComponent', () => {
  let component: NuevaAsistenciaComponent;
  let fixture: ComponentFixture<NuevaAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
