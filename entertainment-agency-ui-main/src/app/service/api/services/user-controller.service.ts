/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { blockUser } from '../fn/user-controller/block-user';
import { BlockUser$Params } from '../fn/user-controller/block-user';
import { changePassword } from '../fn/user-controller/change-password';
import { ChangePassword$Params } from '../fn/user-controller/change-password';
import { unblockUser } from '../fn/user-controller/unblock-user';
import { UnblockUser$Params } from '../fn/user-controller/unblock-user';
import {usernameFromLoggedUser} from "@app/service/api/fn/user-controller/username-from-logged-user";
import {UserDetailsDto} from "@app/service/api/models/user-details";
import {getUserDetails} from "@app/service/api/fn/user-controller/get-user-details";
import {UpdateCurrentUser$Params, updateCurrentUserDetails} from "@app/service/api/fn/user-controller/update-current-user-details";
import {updateUserDetails, UpdateUserDetails$Params} from "@app/service/api/fn/user-controller/update-user-details";

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `unblockUser()` */
  static readonly UnblockUserPath = '/api/v1/user/unblock/{usernameOrEmail}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unblockUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private unblockUser$Response(params: UnblockUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return unblockUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unblockUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unblockUser(params: UnblockUser$Params, context?: HttpContext): Observable<void> {
    return this.unblockUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/api/v1/user/change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<{
}> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `blockUser()` */
  static readonly BlockUserPath = '/api/v1/user/block/{usernameOrEmail}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `blockUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  private blockUser$Response(params: BlockUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return blockUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `blockUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  blockUser(params: BlockUser$Params, context?: HttpContext): Observable<void> {
    return this.blockUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  static readonly usernameFromLoggedUserPath = '/api/v1/user/username';

  private usernameFromLoggedUser$Response(context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return usernameFromLoggedUser(this.http, this.rootUrl, context);
  }

  usernameFromLoggedUser(context?: HttpContext): Observable<string> {
    return this.usernameFromLoggedUser$Response(context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  userDetails(context?: HttpContext): Observable<UserDetailsDto> {
    return this.userDetails$Response(context).pipe(
      map((r: StrictHttpResponse<UserDetailsDto>): UserDetailsDto => r.body)
    )
  }

  private userDetails$Response(context: HttpContext) {
    return getUserDetails(this.http, this.rootUrl, context)
  }

  updateCurrentUserDetails(params: UpdateCurrentUser$Params, context?: HttpContext): Observable<UserDetailsDto> {
    return this.updateCurrentUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDetailsDto>): UserDetailsDto => r.body)
    )
  }

  private updateCurrentUserDetails$Response(params: UpdateCurrentUser$Params, context: HttpContext) {
    return updateCurrentUserDetails(params, this.http, this.rootUrl, context)
  }

  updateUserDetails(params: UpdateUserDetails$Params, context?: HttpContext): Observable<UserDetailsDto> {
    return this.updateUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDetailsDto>): UserDetailsDto => r.body)
    )
  }

  private updateUserDetails$Response(params: UpdateUserDetails$Params, context: HttpContext) {
    return updateUserDetails(params, this.http, this.rootUrl, context)
  }


}
