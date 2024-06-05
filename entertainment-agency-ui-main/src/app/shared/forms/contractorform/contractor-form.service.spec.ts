import { TestBed } from '@angular/core/testing';

import { ContractorFormService } from './contractor-form.service';

describe('ContractorFormService', () => {
  let service: ContractorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
