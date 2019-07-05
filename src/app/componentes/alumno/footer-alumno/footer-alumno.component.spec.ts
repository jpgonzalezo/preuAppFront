import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAlumnoComponent } from './footer-alumno.component';

describe('FooterAlumnoComponent', () => {
  let component: FooterAlumnoComponent;
  let fixture: ComponentFixture<FooterAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
