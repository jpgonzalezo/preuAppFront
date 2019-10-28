import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterApoderadoComponent } from './footer-apoderado.component';

describe('FooterApoderadoComponent', () => {
  let component: FooterApoderadoComponent;
  let fixture: ComponentFixture<FooterApoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterApoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
