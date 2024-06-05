/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AgencyDetailsDto } from '../models/agency-details-dto';
import { initializeAgency } from '../fn/agency-details-controller/initialize-agency';
import { InitializeAgency$Params } from '../fn/agency-details-controller/initialize-agency';
import { updateAgencyDetails } from '../fn/agency-details-controller/update-agency-details';
import { UpdateAgencyDetails$Params } from '../fn/agency-details-controller/update-agency-details';

@Injectable({ providedIn: 'root' })
export class AgencyDetailsControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateAgencyDetails()` */
  static readonly UpdateAgencyDetailsPath = '/api/v1/agency-details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAgencyDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAgencyDetails$Response(params: UpdateAgencyDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<AgencyDetailsDto>> {
    return updateAgencyDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAgencyDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAgencyDetails(params: UpdateAgencyDetails$Params, context?: HttpContext): Observable<AgencyDetailsDto> {
    return this.updateAgencyDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<AgencyDetailsDto>): AgencyDetailsDto => r.body)
    );
  }

  /** Path part for operation `initializeAgency()` */
  static readonly InitializeAgencyPath = '/api/v1/agency-details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `initializeAgency()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  initializeAgency$Response(params: InitializeAgency$Params, context?: HttpContext): Observable<StrictHttpResponse<AgencyDetailsDto>> {
    return initializeAgency(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `initializeAgency$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  initializeAgency(params: InitializeAgency$Params, context?: HttpContext): Observable<AgencyDetailsDto> {
    return this.initializeAgency$Response(params, context).pipe(
      map((r: StrictHttpResponse<AgencyDetailsDto>): AgencyDetailsDto => r.body)
    );
  }

}
