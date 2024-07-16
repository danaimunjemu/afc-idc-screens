import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimraTinVerificationComponent } from './zimra-tin-verification.component';

describe('ZimraTinVerificationComponent', () => {
  let component: ZimraTinVerificationComponent;
  let fixture: ComponentFixture<ZimraTinVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZimraTinVerificationComponent]
    });
    fixture = TestBed.createComponent(ZimraTinVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
