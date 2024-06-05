/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ContractorCreateRequest } from '../../models/contractor-create-request';
import { ContractorDto } from '../../models/contractor-dto';

export interface Edit$Params {
  'public-id': string;
      body: ContractorCreateRequest
}

export function edit(http: HttpClient, rootUrl: string, params: Edit$Params, context?: HttpContext): Observable<StrictHttpResponse<ContractorDto>> {
  const rb = new RequestBuilder(rootUrl, edit.PATH, 'put');
  if (params) {
    rb.path('public-id', params['public-id'], {});
    rb.body(params.body, 'application/json');
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

edit.PATH = '/api/v1/contractor/{public-id}';
