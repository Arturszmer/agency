/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ContractorDto } from '../../models/contractor-dto';

export interface GetContractorDetails$Params {
  'public-id': string;
}

export function getContractorDetails(http: HttpClient, rootUrl: string, params: GetContractorDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<ContractorDto>> {
  const rb = new RequestBuilder(rootUrl, getContractorDetails.PATH, 'get');
  if (params) {
    rb.path('public-id', params['public-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ContractorDto>;
    })
  );
}

getContractorDetails.PATH = '/api/v1/contractor/{public-id}';
