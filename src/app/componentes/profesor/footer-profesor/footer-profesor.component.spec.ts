import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterProfesorComponent } from './footer-profesor.component';

describe('FooterProfesorComponent', () => {
  let component: FooterProfesorComponent;
  let fixture: ComponentFixture<FooterProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
