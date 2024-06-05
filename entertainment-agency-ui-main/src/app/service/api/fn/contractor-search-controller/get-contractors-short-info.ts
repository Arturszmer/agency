/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageShortContractorDto } from '../../models/page-short-contractor-dto';

export interface GetSortableList$Params {
  page: number;
  size: number;
  sort?: string;
  order?: string;
}

export function getContractorsShortInfo(http: HttpClient, rootUrl: string, params: GetSortableList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageShortContractorDto>> {
  const rb = new RequestBuilder(rootUrl, getContractorsShortInfo.PATH, 'get');
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
      return r as StrictHttpResponse<PageShortContractorDto>;
    })
  );
}

getContractorsShortInfo.PATH = '/api/v1/contractor';
