import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaObservacionProfesorComponent } from './nueva-observacion-profesor.component';

describe('NuevaObservacionProfesorComponent', () => {
  let component: NuevaObservacionProfesorComponent;
  let fixture: ComponentFixture<NuevaObservacionProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaObservacionProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaObservacionProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
