/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface BlockUser$Params {
  usernameOrEmail: string;
}

export function blockUser(http: HttpClient, rootUrl: string, params: BlockUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, blockUser.PATH, 'put');
  if (params) {
    rb.path('usernameOrEmail', params.usernameOrEmail, {});
  }

  return http.request(
    rb.build({
      responseType: 'json',
      accept: 'application/json',
      context
    })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<void>;
    })
  );
}

blockUser.PATH = '/api/v1/user/block/{usernameOrEmail}';
