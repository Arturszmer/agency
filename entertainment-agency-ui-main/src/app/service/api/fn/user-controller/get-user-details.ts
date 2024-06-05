import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {RequestBuilder} from "@app/service/api/request-builder";
import {map} from "rxjs/operators";
import {UserDetailsDto} from "@app/service/api/models/user-details";

export function getUserDetails(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, getUserDetails.PATH, 'get');

  return http.request(
    rb.build({
      responseType: 'json',
      accept: 'application/json',
      context
    })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDetailsDto>;
    })
  );
}

getUserDetails.PATH = '/api/v1/user/details';
