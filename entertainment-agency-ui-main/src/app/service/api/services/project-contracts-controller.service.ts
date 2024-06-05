/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addContractToProject } from '../fn/project-contracts-controller/add-contract-to-project';
import { AddContractToProject$Params } from '../fn/project-contracts-controller/add-contract-to-project';
import { ProjectDto } from '../models/project-dto';

@Injectable({ providedIn: 'root' })
export class ProjectContractsControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addContractToProject()` */
  static readonly AddContractToProjectPath = '/api/v1/project/contract-work';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addContractToProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addContractToProject$Response(params: AddContractToProject$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
    return addContractToProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addContractToProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addContractToProject(params: AddContractToProject$Params, context?: HttpContext): Observable<ProjectDto> {
    return this.addContractToProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProjectDto>): ProjectDto => r.body)
    );
  }

}
