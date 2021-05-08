import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiaContrasenaComponent } from './cambia-contrasena.component';

describe('CambiaContrasenaComponent', () => {
  let component: CambiaContrasenaComponent;
  let fixture: ComponentFixture<CambiaContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiaContrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiaContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
