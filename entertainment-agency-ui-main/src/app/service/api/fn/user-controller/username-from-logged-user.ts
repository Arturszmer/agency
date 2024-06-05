import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {RequestBuilder} from "@app/service/api/request-builder";
import {map} from "rxjs/operators";

export function usernameFromLoggedUser(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, usernameFromLoggedUser.PATH, 'get');

  return http.request(
    rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context
    })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

usernameFromLoggedUser.PATH = '/api/v1/user/username';
