/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {adminInitialize, AdminInitialize$Params, isAdminInitialize} from '../fn/auth-controller/admin-initialize';
import {AuthenticationResponse} from '../models/authentication-response';
import {login, Login$Params} from '../fn/auth-controller/login';
import {register, Register$Params} from '../fn/auth-controller/register';
import {UserDetailsDto} from "@app/service/api/models/user-details";
import {resetPassword, ResetPassword$Params} from "@app/service/api/fn/user-controller/reset-password";

@Injectable({ providedIn: 'root' })
export class AuthControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsDto>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<UserDetailsDto> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDetailsDto>): UserDetailsDto => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `adminInitialize()` */
  static readonly AdminInitializePath = '/api/auth/admin-initializer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminInitialize()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  private adminInitialize$Response(params: AdminInitialize$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return adminInitialize(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminInitialize$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminInitialize(params: AdminInitialize$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.adminInitialize$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  isInitialized(): Observable<Boolean> {
    return isAdminInitialize(this.http, this.rootUrl).pipe(
      map((r: StrictHttpResponse<Boolean>): Boolean => r.body)
    )
  }

  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<string> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body));
  }

  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }
}
