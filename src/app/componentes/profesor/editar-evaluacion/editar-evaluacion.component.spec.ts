import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvaluacionComponent } from './editar-evaluacion.component';

describe('EditarEvaluacionComponent', () => {
  let component: EditarEvaluacionComponent;
  let fixture: ComponentFixture<EditarEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
