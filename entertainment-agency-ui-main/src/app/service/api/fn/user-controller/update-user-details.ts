import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {UserDetailsDto} from "@app/service/api/models/user-details";
import {RequestBuilder} from "@app/service/api/request-builder";
import {map} from "rxjs/operators";
import {UpdateCurrentUser$Params} from "@app/service/api/fn/user-controller/update-current-user-details";

export interface UpdateUserDetails$Params {
  body: UpdateCurrentUser$Params,
  username: string
}

export function updateUserDetails(params: UpdateUserDetails$Params, http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, updateUserDetails.PATH, 'put');

  if (params) {
    rb.body(params.body, 'application/json');
    rb.path('username', params.username, {} )
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

updateUserDetails.PATH = '/api/v1/user/edit-user/{username}';
