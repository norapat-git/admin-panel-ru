import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAll } from './registered-all';

describe('RegisteredAll', () => {
  let component: RegisteredAll;
  let fixture: ComponentFixture<RegisteredAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredAll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
