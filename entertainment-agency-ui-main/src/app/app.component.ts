import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {AppModule} from "@app/app.module";
import {StartPageModule} from "@app/pages/start/start-page/start-page.module";
import {TranslateService} from "@ngx-translate/core";
import {LANGUAGE_ITEM} from "@app/shared/utils/local-storage-items";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle, AppModule, StartPageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Agency-UI-v1';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'pl']);
    const storedLanguage = localStorage.getItem(LANGUAGE_ITEM);
    if(storedLanguage){
      this.translate.setDefaultLang(storedLanguage)
    } else {
      this.translate.setDefaultLang('pl');
    }
  }
}
