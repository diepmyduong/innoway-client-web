import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbLayoutComponent } from './fb-layout.component';

describe('FbLayoutComponent', () => {
  let component: FbLayoutComponent;
  let fixture: ComponentFixture<FbLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
