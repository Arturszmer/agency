export const regex: any = {
  email: /^\s*(?:[A-Za-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))\s*$/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+:;,.?~`-])[A-Za-z\d!@#$%^&*()_+:;,.?~`-]{12,}$/,
  latin: /^[A-Za-z-\s]+$/,
  numbers: /^\d+$/,
  latinAndNumbers: /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
  latinAndNumbersAndSpaces: /^[A-Za-z0-9\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
  latinAndSpaces: /^[a-zA-Z\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$/,
  lastName: /^[a-zA-Z\s-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$/,
  phone: /^[0-9-]+$/,
  safe: /^([\sA-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])*$/,
  zipCode: /^\d{2}-\d{3}$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
};

export const regexErrors = {
  email: 'Email is incorrect',
  password: 'Password must contain not less than 12 letters, an upper case letter, a lower case letter, a number and special character',
  latin: 'Latin letters only',
  numbers: 'Digits only',
  latinAndNumbers: 'Latin letters and digits only',
  latinAndSpaces: 'Latin letters and spaces only',
  phone: 'Phone number is incorrect. Only numbers are available',
  safe: 'Latin letters, numbers and special characters only',
  zipCode: 'Zip code must be in this format: XX-XXX where X is a number',
  date: 'Provided data is not correct, it must be in this format: YYYY-MM-DD'
}
