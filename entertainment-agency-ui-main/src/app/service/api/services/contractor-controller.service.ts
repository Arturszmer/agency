/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add } from '../fn/contractor-controller/add';
import { Add$Params } from '../fn/contractor-controller/add';
import { ContractorDto } from '../models/contractor-dto';
import { delete$ } from '../fn/contractor-controller/delete';
import { Delete$Params } from '../fn/contractor-controller/delete';
import { edit } from '../fn/contractor-controller/edit';
import { Edit$Params } from '../fn/contractor-controller/edit';

@Injectable({ providedIn: 'root' })
export class ContractorControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `edit()` */
  static readonly EditPath = '/api/v1/contractor/{public-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `edit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit$Response(params: Edit$Params, context?: HttpContext): Observable<StrictHttpResponse<ContractorDto>> {
    return edit(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `edit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  edit(params: Edit$Params, context?: HttpContext): Observable<ContractorDto> {
    return this.edit$Response(params, context).pipe(
      map((r: StrictHttpResponse<ContractorDto>): ContractorDto => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/api/v1/contractor/{public-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: Delete$Params, context?: HttpContext): Observable<void> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `add()` */
  static readonly AddPath = '/api/v1/contractor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add$Response(params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<ContractorDto>> {
    return add(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add(params: Add$Params, context?: HttpContext): Observable<ContractorDto> {
    return this.add$Response(params, context).pipe(
      map((r: StrictHttpResponse<ContractorDto>): ContractorDto => r.body)
    );
  }

}
