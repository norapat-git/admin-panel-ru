import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadEtStdc } from './download-et-stdc';

describe('DownloadEtStdc', () => {
  let component: DownloadEtStdc;
  let fixture: ComponentFixture<DownloadEtStdc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadEtStdc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadEtStdc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
