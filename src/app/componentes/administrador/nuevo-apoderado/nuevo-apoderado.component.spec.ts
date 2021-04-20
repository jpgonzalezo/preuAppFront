import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoApoderadoComponent } from './nuevo-apoderado.component';

describe('NuevoApoderadoComponent', () => {
  let component: NuevoApoderadoComponent;
  let fixture: ComponentFixture<NuevoApoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoApoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
