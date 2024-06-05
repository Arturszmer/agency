/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { create } from '../fn/project-controller/create';
import { Create$Params } from '../fn/project-controller/create';
import { ProjectDto } from '../models/project-dto';
import { updateStatus } from '../fn/project-controller/update-status';
import { UpdateStatus$Params } from '../fn/project-controller/update-status';

@Injectable({ providedIn: 'root' })
export class ProjectControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateStatus()` */
  static readonly UpdateStatusPath = '/api/v1/project/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus$Response(params: UpdateStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
    return updateStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus(params: UpdateStatus$Params, context?: HttpContext): Observable<ProjectDto> {
    return this.updateStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProjectDto>): ProjectDto => r.body)
    );
  }

  /** Path part for operation `create()` */
  static readonly CreatePath = '/api/v1/project';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectDto>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: Create$Params, context?: HttpContext): Observable<ProjectDto> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProjectDto>): ProjectDto => r.body)
    );
  }

}
