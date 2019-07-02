import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfesorComponent } from './header-profesor.component';

describe('HeaderProfesorComponent', () => {
  let component: HeaderProfesorComponent;
  let fixture: ComponentFixture<HeaderProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
