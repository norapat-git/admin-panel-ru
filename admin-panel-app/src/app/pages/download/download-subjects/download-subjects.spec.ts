import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSubjects } from './download-subjects';

describe('DownloadSubjects', () => {
  let component: DownloadSubjects;
  let fixture: ComponentFixture<DownloadSubjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadSubjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadSubjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
