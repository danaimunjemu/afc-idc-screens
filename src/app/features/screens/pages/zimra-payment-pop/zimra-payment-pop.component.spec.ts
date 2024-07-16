import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimraPaymentPopComponent } from './zimra-payment-pop.component';

describe('ZimraPaymentPopComponent', () => {
  let component: ZimraPaymentPopComponent;
  let fixture: ComponentFixture<ZimraPaymentPopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZimraPaymentPopComponent]
    });
    fixture = TestBed.createComponent(ZimraPaymentPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
