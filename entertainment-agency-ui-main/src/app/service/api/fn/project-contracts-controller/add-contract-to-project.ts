/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ContractWorkCreateDto } from '../../models/contract-work-create-dto';
import { ProjectDto } from '../../models/project-dto';

export interface AddContractToProject$Params {
      body: ContractWorkCreateDto
}

export function addContractToProject(http: HttpClient, rootUrl: string, params: AddContractToProject$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
  const rb = new RequestBuilder(rootUrl, addContractToProject.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

addContractToProject.PATH = '/api/v1/project/contract-work';
