import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlSliderComponent } from './bl-slider.component';

describe('BlSliderComponent', () => {
  let component: BlSliderComponent;
  let fixture: ComponentFixture<BlSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
