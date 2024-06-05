import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnClosePopupComponent } from './on-close-popup.component';

describe('OnClosePopupComponent', () => {
  let component: OnClosePopupComponent;
  let fixture: ComponentFixture<OnClosePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnClosePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnClosePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
