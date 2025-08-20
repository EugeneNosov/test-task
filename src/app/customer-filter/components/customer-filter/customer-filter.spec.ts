import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilter } from './customer-filter';

describe('CustomerFilter', () => {
  let component: CustomerFilter;
  let fixture: ComponentFixture<CustomerFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
