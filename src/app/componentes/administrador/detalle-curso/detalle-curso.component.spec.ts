import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCursoComponent } from './detalle-curso.component';

describe('DetalleCursoComponent', () => {
  let component: DetalleCursoComponent;
  let fixture: ComponentFixture<DetalleCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
