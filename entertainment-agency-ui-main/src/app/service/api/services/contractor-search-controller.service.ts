/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ContractorDto } from '../models/contractor-dto';
import { getContractorDetails } from '../fn/contractor-search-controller/get-contractor-details';
import { GetContractorDetails$Params } from '../fn/contractor-search-controller/get-contractor-details';
import { getContractorsShortInfo } from '../fn/contractor-search-controller/get-contractors-short-info';
import { GetSortableList$Params } from '../fn/contractor-search-controller/get-contractors-short-info';
import { PageShortContractorDto } from '../models/page-short-contractor-dto';

@Injectable({ providedIn: 'root' })
export class ContractorSearchControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getContractorDetails()` */
  static readonly GetContractorDetailsPath = '/api/v1/contractor/{public-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractorDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  private getContractorDetails$Response(params: GetContractorDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<ContractorDto>> {
    return getContractorDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getContractorDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractorDetails(params: GetContractorDetails$Params, context?: HttpContext): Observable<ContractorDto> {
    return this.getContractorDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<ContractorDto>): ContractorDto => r.body)
    );
  }

  /** Path part for operation `getContractorsShortInfo()` */
  static readonly GetContractorsShortInfoPath = '/api/v1/contractor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractorsShortInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  private getContractorsShortInfo$Response(params: GetSortableList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageShortContractorDto>> {
    return getContractorsShortInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getContractorsShortInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractorsShortInfo(params: GetSortableList$Params, context?: HttpContext): Observable<PageShortContractorDto> {
    return this.getContractorsShortInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageShortContractorDto>): PageShortContractorDto => r.body)
    );
  }

}
