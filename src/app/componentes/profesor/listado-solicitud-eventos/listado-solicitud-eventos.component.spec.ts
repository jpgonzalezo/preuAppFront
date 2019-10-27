import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSolicitudEventosComponent } from './listado-solicitud-eventos.component';

describe('ListadoSolicitudEventosComponent', () => {
  let component: ListadoSolicitudEventosComponent;
  let fixture: ComponentFixture<ListadoSolicitudEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoSolicitudEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoSolicitudEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
