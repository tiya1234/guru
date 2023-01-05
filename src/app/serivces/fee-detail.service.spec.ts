import { TestBed } from '@angular/core/testing';

import { FeeDetailService } from './fee-detail.service';

describe('FeeDetailService', () => {
  let service: FeeDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
