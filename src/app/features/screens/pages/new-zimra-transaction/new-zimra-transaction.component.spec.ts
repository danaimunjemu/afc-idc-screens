import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZimraTransactionComponent } from './new-zimra-transaction.component';

describe('NewZimraTransactionComponent', () => {
  let component: NewZimraTransactionComponent;
  let fixture: ComponentFixture<NewZimraTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewZimraTransactionComponent]
    });
    fixture = TestBed.createComponent(NewZimraTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
