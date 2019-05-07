import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAsistenciaComponent } from './detalle-asistencia.component';

describe('DetalleAsistenciaComponent', () => {
  let component: DetalleAsistenciaComponent;
  let fixture: ComponentFixture<DetalleAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
