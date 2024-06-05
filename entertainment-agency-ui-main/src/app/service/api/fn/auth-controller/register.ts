/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';
import {CreateUserRequest} from "@app/service/api/models/create-user-request";
import {UserDetailsDto} from "@app/service/api/models/user-details";

export interface Register$Params {
      body: CreateUserRequest
}

export function register(http: HttpClient, rootUrl: string, params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, register.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDetailsDto>;
    })
  );
}

register.PATH = '/api/auth/register';
