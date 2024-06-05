import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {


  constructor(private translate: TranslateService) { }

  changeLanguage(){
    if(this.translate.currentLang === 'en'){
      this.translate.use('pl')
    } else {
      this.translate.use('en')
    }
  }
}
