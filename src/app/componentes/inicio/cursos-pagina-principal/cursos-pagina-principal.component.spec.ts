import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPaginaPrincipalComponent } from './cursos-pagina-principal.component';

describe('CursosPaginaPrincipalComponent', () => {
  let component: CursosPaginaPrincipalComponent;
  let fixture: ComponentFixture<CursosPaginaPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosPaginaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosPaginaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
