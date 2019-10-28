import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderApoderadoComponent } from './header-apoderado.component';

describe('HeaderApoderadoComponent', () => {
  let component: HeaderApoderadoComponent;
  let fixture: ComponentFixture<HeaderApoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderApoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
