import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSpecial } from './registered-special';

describe('RegisteredSpecial', () => {
  let component: RegisteredSpecial;
  let fixture: ComponentFixture<RegisteredSpecial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredSpecial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredSpecial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
