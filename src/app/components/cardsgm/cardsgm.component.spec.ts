import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsgmComponent } from './cardsgm.component';

describe('CardsgmComponent', () => {
  let component: CardsgmComponent;
  let fixture: ComponentFixture<CardsgmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsgmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
