import { TestBed } from '@angular/core/testing';

import { CaserviceService } from './caservice.service';

describe('CaserviceService', () => {
  let service: CaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
