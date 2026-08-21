import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPaid } from './registered-paid';

describe('RegisteredPaid', () => {
  let component: RegisteredPaid;
  let fixture: ComponentFixture<RegisteredPaid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredPaid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredPaid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
