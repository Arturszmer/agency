/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AgencyDetailsDto } from '../../models/agency-details-dto';

export interface InitializeAgency$Params {
      body: AgencyDetailsDto
}

export function initializeAgency(http: HttpClient, rootUrl: string, params: InitializeAgency$Params, context?: HttpContext): Observable<StrictHttpResponse<AgencyDetailsDto>> {
  const rb = new RequestBuilder(rootUrl, initializeAgency.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AgencyDetailsDto>;
    })
  );
}

initializeAgency.PATH = '/api/v1/agency-details';
