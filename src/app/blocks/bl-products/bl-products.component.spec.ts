import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlProductsComponent } from './bl-products.component';

describe('BlProductsComponent', () => {
  let component: BlProductsComponent;
  let fixture: ComponentFixture<BlProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
