import { TestBed } from '@angular/core/testing';

import { LserviceService } from './lservice.service';

describe('LserviceService', () => {
  let service: LserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
