import { TestBed } from '@angular/core/testing';

import { PeselValidatorService } from './pesel-validator.service';

describe('PeselValidatorService', () => {
  let service: PeselValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeselValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for null input', () => {
    expect(service.validate(null)).toBeFalse();
  });

  it('should return false for undefined input', () => {
    expect(service.validate(undefined)).toBeFalse();
  });

  it('should return false for an empty string', () => {
    expect(service.validate('')).toBeFalse();
  });

  it('should return false for a string of incorrect length', () => {
    expect(service.validate('123')).toBeFalse();
    expect(service.validate('123456789012')).toBeFalse();
  });

  it('should return false for invalid PESEL numbers', () => {
    expect(service.validate('12345678901')).toBeFalse(); // Incorrect checksum
    expect(service.validate('44051401457')).toBeFalse(); // Incorrect birth date
  });

  it('should return true for a valid PESEL number', () => {
    expect(service.validate('44051401458')).toBeTrue(); // Correct checksum and birth date
  });

  it('should handle PESEL numbers from different centuries', () => {
    expect(service.validate('18120619240')).toBeTrue(); // 21st century
    expect(service.validate('80010322170')).toBeTrue(); // 19th century
  });

  it('should return false for dates that do not exist', () => {
    expect(service.validate('99133212347')).toBeFalse(); // Invalid date: 33rd month
    expect(service.validate('99022912375')).toBeFalse(); // Non-leap year, February 29
  });
});
