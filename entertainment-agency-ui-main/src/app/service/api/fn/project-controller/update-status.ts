/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProjectDto } from '../../models/project-dto';

export interface UpdateStatus$Params {
  'contract-number': string;
  status: 'PROPOSITION' | 'DRAFT' | 'READY_TO_SIGN' | 'SIGNED' | 'TERMINATED';
}

export function updateStatus(http: HttpClient, rootUrl: string, params: UpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
  const rb = new RequestBuilder(rootUrl, updateStatus.PATH, 'put');
  if (params) {
    rb.query('contract-number', params['contract-number'], {});
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProjectDto>;
    })
  );
}

updateStatus.PATH = '/api/v1/project/status';
