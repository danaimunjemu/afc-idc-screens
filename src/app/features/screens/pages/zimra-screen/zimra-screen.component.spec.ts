import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZimraScreenComponent } from './zimra-screen.component';

describe('ZimraScreenComponent', () => {
  let component: ZimraScreenComponent;
  let fixture: ComponentFixture<ZimraScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZimraScreenComponent]
    });
    fixture = TestBed.createComponent(ZimraScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
