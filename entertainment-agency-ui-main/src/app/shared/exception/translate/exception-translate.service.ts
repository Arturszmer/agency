import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AgencyErrorResponseDto} from "@app/service/api/models/agency-error-response-dto";

@Injectable({
  providedIn: 'root'
})
export class ExceptionTranslateService {

  constructor(private translate: TranslateService) { }

  userException(error: any): string {
    return this.translateException('exception.user.', error)
  }

  private translateException(i18nDirection: string, error: AgencyErrorResponseDto){
    const agencyError = error as AgencyErrorResponseDto;
    if (agencyError && ('code' in agencyError && 'message' in agencyError && 'status' in agencyError)) {
      if(this.translate.currentLang === 'en' || this.translate.defaultLang === 'en'){
        return error.message;
      } else {
        return this.translate.instant(i18nDirection + error.code);
      }
    } else {
      return this.defaultTranslate()
    }
  }

  private defaultTranslate(){
    return this.translate.instant('exception.default')
  }
}
