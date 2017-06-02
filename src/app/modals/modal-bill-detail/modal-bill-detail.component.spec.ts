import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBillDetailComponent } from './modal-bill-detail.component';

describe('ModalBillDetailComponent', () => {
  let component: ModalBillDetailComponent;
  let fixture: ComponentFixture<ModalBillDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBillDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
