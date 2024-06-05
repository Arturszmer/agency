import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {RequestBuilder} from "@app/service/api/request-builder";
import {filter, map} from "rxjs/operators";
import {GetSortableList$Params} from "@app/service/api/fn/contractor-search-controller/get-contractors-short-info";
import {PageUserDetailsDto} from "@app/service/api/models/page-user-details-dto";

export function getUsers(http: HttpClient,
                         rootUrl: string,
                         params: GetSortableList$Params,
                         context?: HttpContext):
  Observable<StrictHttpResponse<PageUserDetailsDto>> {

  const rb = new RequestBuilder(rootUrl, getUsers.PATH, 'get');

  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sort', params.sort, {});
    rb.query('order', params.order, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageUserDetailsDto>;
    })
  );
}

getUsers.PATH = '/api/v1/user';
