import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatManagement } from './seat-management';

describe('SeatManagement', () => {
  let component: SeatManagement;
  let fixture: ComponentFixture<SeatManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
