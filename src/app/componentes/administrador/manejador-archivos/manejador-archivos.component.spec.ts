import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejadorArchivosComponent } from './manejador-archivos.component';

describe('ManejadorArchivosComponent', () => {
  let component: ManejadorArchivosComponent;
  let fixture: ComponentFixture<ManejadorArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejadorArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejadorArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
