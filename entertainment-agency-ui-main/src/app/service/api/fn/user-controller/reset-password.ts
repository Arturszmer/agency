import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {RequestBuilder} from "@app/service/api/request-builder";
import {filter, map} from "rxjs/operators";

export interface ResetPassword$Params {
  username: string
}

export function resetPassword(http: HttpClient, rootUrl: string, params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, resetPassword.PATH, 'put');
  if (params) {
    rb.path('username', params.username, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

resetPassword.PATH = '/api/auth/reset-password/{username}';
