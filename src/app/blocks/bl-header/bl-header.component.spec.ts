import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlHeaderComponent } from './bl-header.component';

describe('BlHeaderComponent', () => {
  let component: BlHeaderComponent;
  let fixture: ComponentFixture<BlHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
