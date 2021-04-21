import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaObservacionAlumnoComponent } from './nueva-observacion-alumno.component';

describe('NuevaObservacionAlumnoComponent', () => {
  let component: NuevaObservacionAlumnoComponent;
  let fixture: ComponentFixture<NuevaObservacionAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaObservacionAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaObservacionAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
