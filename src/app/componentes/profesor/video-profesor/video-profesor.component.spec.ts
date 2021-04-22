import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoProfesorComponent } from './video-profesor.component';

describe('VideoProfesorComponent', () => {
  let component: VideoProfesorComponent;
  let fixture: ComponentFixture<VideoProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
