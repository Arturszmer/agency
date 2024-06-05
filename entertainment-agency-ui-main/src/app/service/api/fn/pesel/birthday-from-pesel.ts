export function extractBirthDateFromPesel(pesel: string, format: string = 'YYYY-MM-DD'): string | null {
  if (!/^\d{11}$/.test(pesel)) {
    return null;
  }

  const year = parseInt(pesel.substring(0, 2), 10);
  let month = parseInt(pesel.substring(2, 4), 10);
  const day = parseInt(pesel.substring(4, 6), 10);

  let fullYear: number;

  if (month >= 1 && month <= 12) {
    fullYear = 1900 + year;
  } else if (month >= 21 && month <= 32) {
    fullYear = 2000 + year;
    month -= 20;
  } else if (month >= 41 && month <= 52) {
    fullYear = 2100 + year;
    month -= 40;
  } else if (month >= 61 && month <= 72) {
    fullYear = 2200 + year;
    month -= 60;
  } else if (month >= 81 && month <= 92) {
    fullYear = 1800 + year;
    month -= 80;
  } else {
    return null;
  }

  const date = new Date(fullYear, month - 1, day);

  return formatDate(date, format);
}

function formatDate(date: Date, format: string): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
}
