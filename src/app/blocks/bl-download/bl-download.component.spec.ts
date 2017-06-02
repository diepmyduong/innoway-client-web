import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlDownloadComponent } from './bl-download.component';

describe('BlDownloadComponent', () => {
  let component: BlDownloadComponent;
  let fixture: ComponentFixture<BlDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
