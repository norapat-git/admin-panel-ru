import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandTotal } from './grand-total';

describe('GrandTotal', () => {
  let component: GrandTotal;
  let fixture: ComponentFixture<GrandTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrandTotal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrandTotal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
