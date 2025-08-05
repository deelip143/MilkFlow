import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDeliveryEntryComponent } from './daily-delivery-entry.component';

describe('DailyDeliveryEntryComponent', () => {
  let component: DailyDeliveryEntryComponent;
  let fixture: ComponentFixture<DailyDeliveryEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDeliveryEntryComponent]
    });
    fixture = TestBed.createComponent(DailyDeliveryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
