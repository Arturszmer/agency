import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {UserDetailsDto} from "@app/service/api/models/user-details";
import {RequestBuilder} from "@app/service/api/request-builder";
import {map} from "rxjs/operators";

export interface UpdateCurrentUser$Params {
  body: UserDetailsDto
}

export function updateCurrentUserDetails(params: UpdateCurrentUser$Params, http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, updateCurrentUserDetails.PATH, 'put');

  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({
      responseType: 'json',
      accept: 'application/json',
      context,
    })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDetailsDto>;
    })
  );
}

updateCurrentUserDetails.PATH = '/api/v1/user/edit';
