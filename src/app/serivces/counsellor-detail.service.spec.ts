import { TestBed } from '@angular/core/testing';

import { CounsellorDetailService } from './counsellor-detail.service';

describe('CounsellorDetailService', () => {
  let service: CounsellorDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounsellorDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
