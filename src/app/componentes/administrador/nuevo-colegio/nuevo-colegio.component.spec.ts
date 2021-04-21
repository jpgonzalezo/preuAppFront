import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoColegioComponent } from './nuevo-colegio.component';

describe('NuevoColegioComponent', () => {
  let component: NuevoColegioComponent;
  let fixture: ComponentFixture<NuevoColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
