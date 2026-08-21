import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadRu25et } from './download-ru25et';

describe('DownloadRu25et', () => {
  let component: DownloadRu25et;
  let fixture: ComponentFixture<DownloadRu25et>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadRu25et]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadRu25et);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
