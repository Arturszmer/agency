import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeselValidatorService {

  private static readonly WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  validate(pesel: string): boolean {
    if (!pesel || pesel.length !== 11) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const result = parseInt(pesel[i], 10) * PeselValidatorService.WEIGHTS[i];
      sum += this.getOnlyLastDigitIfNumberIsHigherThanTen(result);
    }

    let checkDigit = 10 - (sum % 10);
    if (checkDigit === 10) {
      checkDigit = 0;
    }

    return checkDigit === parseInt(pesel[10], 10) && this.validateBirthDate(pesel);
  }

  private getOnlyLastDigitIfNumberIsHigherThanTen(result: number): number {
    return result % 10;
  }

  private validateBirthDate(pesel: string): boolean {
    const birthDate = this.getBirthDateFromPesel(pesel);
    if (!birthDate) {
      return false;
    }

    const now = new Date();
    return birthDate <= now;
  }

  getBirthDateFromPesel(pesel: string): Date | null {
    if (!pesel || pesel.length !== 11) {
      return null;
    }

    let year = parseInt(pesel.substring(0, 2), 10);
    let month = parseInt(pesel.substring(2, 4), 10);
    const day = parseInt(pesel.substring(4, 6), 10);

    if (month >= 1 && month <= 12) {
      year += 1900;
    } else if (month >= 21 && month <= 32) {
      year += 2000;
      month -= 20;
    } else if (month >= 41 && month <= 52) {
      year += 2100;
      month -= 40;
    } else if (month >= 61 && month <= 72) {
      year += 2200;
      month -= 60;
    } else if (month >= 81 && month <= 92) {
      year += 1800;
      month -= 80;
    } else {
      return null;
    }

    try {
      return new Date(year, month - 1, day);
    } catch (e) {
      return null;
    }
  }

}
