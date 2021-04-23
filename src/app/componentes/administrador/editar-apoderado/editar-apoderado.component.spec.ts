import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarApoderadoComponent } from './editar-apoderado.component';

describe('EditarApoderadoComponent', () => {
  let component: EditarApoderadoComponent;
  let fixture: ComponentFixture<EditarApoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarApoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
