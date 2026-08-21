import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRows } from './exam-rows';

describe('ExamRows', () => {
  let component: ExamRows;
  let fixture: ComponentFixture<ExamRows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamRows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamRows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
