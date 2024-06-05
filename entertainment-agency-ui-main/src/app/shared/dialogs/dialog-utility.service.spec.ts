import { TestBed } from '@angular/core/testing';

import { DialogUtilityService } from './dialog-utility.service';

describe('DialogUtilityService', () => {
  let service: DialogUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
