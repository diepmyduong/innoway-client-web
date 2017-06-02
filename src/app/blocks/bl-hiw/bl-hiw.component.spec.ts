import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlHIWComponent } from './bl-hiw.component';

describe('BlHIWComponent', () => {
  let component: BlHIWComponent;
  let fixture: ComponentFixture<BlHIWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlHIWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlHIWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
