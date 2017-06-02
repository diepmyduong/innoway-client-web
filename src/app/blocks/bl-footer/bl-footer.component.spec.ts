import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlFooterComponent } from './bl-footer.component';

describe('BlFooterComponent', () => {
  let component: BlFooterComponent;
  let fixture: ComponentFixture<BlFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
