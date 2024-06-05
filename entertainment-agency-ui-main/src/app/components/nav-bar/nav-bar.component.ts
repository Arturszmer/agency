import {Component, Input, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSidenav} from "@angular/material/sidenav";
import {Router, RouterLink} from "@angular/router";
import {UserControllerService} from "@app/service/api/services/user-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {MatCardHeader} from "@angular/material/card";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {LANGUAGE_ITEM, TOKEN} from "@app/shared/utils/local-storage-items";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    MatMenuTrigger,
    RouterLink,
    MatCardHeader,
    TranslateModule,
    MatSlideToggle,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  @Input() drawer: MatSidenav;
  username: string;

  constructor(private router: Router,
              private userController: UserControllerService,
              private showMessage: ShowMessageService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.userController.usernameFromLoggedUser().subscribe({
      next: response => {
        this.username = response
      }, error: () => {
        this.showMessage.message("Something went wrong, contact with administrator")
      }
    })
  }

  toggleSidenav() {
    this.drawer.toggle();
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/login'])
  }

  setLanguage(language: string) {
    this.translate.use(language)
    localStorage.setItem(LANGUAGE_ITEM, language)
  }
}
