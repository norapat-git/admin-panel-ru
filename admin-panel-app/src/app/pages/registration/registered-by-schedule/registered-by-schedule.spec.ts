import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredBySchedule } from './registered-by-schedule';

describe('RegisteredBySchedule', () => {
  let component: RegisteredBySchedule;
  let fixture: ComponentFixture<RegisteredBySchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredBySchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredBySchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
