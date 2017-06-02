import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlMapComponent } from './bl-map.component';

describe('BlMapComponent', () => {
  let component: BlMapComponent;
  let fixture: ComponentFixture<BlMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
