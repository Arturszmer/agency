/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserControllerService } from './services/user-controller.service';
import { ProjectControllerService } from './services/project-controller.service';
import { ContractorSearchControllerService } from './services/contractor-search-controller.service';
import { ContractorControllerService } from './services/contractor-controller.service';
import { AgencyDetailsControllerService } from './services/agency-details-controller.service';
import { ProjectContractsControllerService } from './services/project-contracts-controller.service';
import { AuthControllerService } from './services/auth-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserControllerService,
    ProjectControllerService,
    ContractorSearchControllerService,
    ContractorControllerService,
    AgencyDetailsControllerService,
    ProjectContractsControllerService,
    AuthControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
