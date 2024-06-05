/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdminInitializerDto } from '../../models/admin-initializer-dto';
import { AuthenticationResponse } from '../../models/authentication-response';

export interface AdminInitialize$Params {
      body: AdminInitializerDto
}

export function adminInitialize(http: HttpClient, rootUrl: string, params: AdminInitialize$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
  const rb = new RequestBuilder(rootUrl, adminInitialize.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthenticationResponse>;
    })
  );
}

adminInitialize.PATH = '/api/auth/admin-initializer';

export function isAdminInitialize(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<Boolean>>{
  const rb = new RequestBuilder(rootUrl, '/api/auth/is-initialized', 'get');

  return http.request(
    rb.build({responseType: 'json', accept: 'application/json', context})
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Boolean>;
    })
  )
}
