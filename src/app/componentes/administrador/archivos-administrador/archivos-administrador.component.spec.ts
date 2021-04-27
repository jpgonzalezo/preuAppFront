import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosAdministradorComponent } from './archivos-administrador.component';

describe('ArchivosAdministradorComponent', () => {
  let component: ArchivosAdministradorComponent;
  let fixture: ComponentFixture<ArchivosAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
