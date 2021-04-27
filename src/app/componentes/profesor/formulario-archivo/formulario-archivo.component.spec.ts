import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioArchivoComponent } from './formulario-archivo.component';

describe('FormularioArchivoComponent', () => {
  let component: FormularioArchivoComponent;
  let fixture: ComponentFixture<FormularioArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
