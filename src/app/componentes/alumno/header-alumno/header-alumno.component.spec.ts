import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAlumnoComponent } from './header-alumno.component';

describe('HeaderAlumnoComponent', () => {
  let component: HeaderAlumnoComponent;
  let fixture: ComponentFixture<HeaderAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
