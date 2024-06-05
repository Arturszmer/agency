/* tslint:disable */
/* eslint-disable */
export interface RegistrationRequest {
  email?: string;
  password?: string;
  roleType?: 'ADMIN' | 'MANAGER' | 'USER';
  username?: string;
}
