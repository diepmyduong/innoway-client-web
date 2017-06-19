import { TestBed, async, inject } from '@angular/core/testing';

import { FbGuard } from './fb.guard';

describe('FbGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbGuard]
    });
  });

  it('should ...', inject([FbGuard], (guard: FbGuard) => {
    expect(guard).toBeTruthy();
  }));
});
