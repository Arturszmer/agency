import {Injectable} from '@angular/core';
import {ApiConfiguration} from "@app/service/api/api-configuration";
import {HttpClient, HttpContext} from "@angular/common/http";
import {BaseService} from "@app/service/api/base-service";
import {GetSortableList$Params} from "@app/service/api/fn/contractor-search-controller/get-contractors-short-info";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StrictHttpResponse} from "@app/service/api/strict-http-response";
import {getUsers} from "@app/service/api/fn/user-controller/get-users";
import {PageUserDetailsDto} from "@app/service/api/models/page-user-details-dto";

@Injectable({
  providedIn: 'root'
})
export class UserSearchControllerService extends BaseService{

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getUserDetails(params: GetSortableList$Params, context?: HttpContext): Observable<PageUserDetailsDto> {
    return this.getUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageUserDetailsDto>): PageUserDetailsDto => r.body)
    );
  }

  private getUserDetails$Response(params: GetSortableList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageUserDetailsDto>> {
      return getUsers(this.http, this.rootUrl, params, context);
  }
}
