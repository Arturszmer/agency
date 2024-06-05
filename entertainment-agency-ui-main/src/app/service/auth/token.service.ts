import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TOKEN} from "@app/shared/utils/local-storage-items";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  get token(): string {
    return localStorage.getItem(TOKEN) as string;
  }

  isTokenValid(){
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.scope.split(" ") || [];
    }
    return [];
  }

}
