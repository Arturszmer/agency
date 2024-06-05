import { TestBed } from '@angular/core/testing';

import { ExceptionTranslateService } from './exception-translate.service';

describe('ExceptionTranslateService', () => {
  let service: ExceptionTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
