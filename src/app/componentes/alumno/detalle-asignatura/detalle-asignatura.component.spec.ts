import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAsignaturaComponent } from './detalle-asignatura.component';

describe('DetalleAsignaturaComponent', () => {
  let component: DetalleAsignaturaComponent;
  let fixture: ComponentFixture<DetalleAsignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAsignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
