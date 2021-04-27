import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosAlumnoComponent } from './archivos-alumno.component';

describe('ArchivosAlumnoComponent', () => {
  let component: ArchivosAlumnoComponent;
  let fixture: ComponentFixture<ArchivosAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
