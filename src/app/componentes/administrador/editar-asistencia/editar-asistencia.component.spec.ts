import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAsistenciaComponent } from './editar-asistencia.component';

describe('EditarAsistenciaComponent', () => {
  let component: EditarAsistenciaComponent;
  let fixture: ComponentFixture<EditarAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
