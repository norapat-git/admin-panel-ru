import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTotal } from './daily-total';

describe('DailyTotal', () => {
  let component: DailyTotal;
  let fixture: ComponentFixture<DailyTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTotal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTotal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
