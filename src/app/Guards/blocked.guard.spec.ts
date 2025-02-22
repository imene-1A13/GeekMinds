import { TestBed } from '@angular/core/testing';

import { BlockedGuard } from './blocked.guard';

describe('BlockedGuard', () => {
  let guard: BlockedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
