import { TestBed } from '@angular/core/testing';

import { TokenRegisterService } from './token-register.service';

describe('TokenRegisterService', () => {
  let service: TokenRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
