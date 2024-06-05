import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthControllerService} from "@app/service/api/services/auth-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {TOKEN} from "@app/shared/utils/local-storage-items";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent implements OnInit{

  isInitialized: boolean;

  constructor(private router: Router,
              private authService: AuthControllerService,
              private showMessage: ShowMessageService) {
  }

  ngOnInit(): void {
    this.authService.isInitialized().subscribe({
      next: (res) => {
      this.isInitialized = res.valueOf();
      },
    error: (err) => {
      if(err.status === 401){
        localStorage.removeItem(TOKEN);
        this.isInitialized = true;
      } else {
        this.isInitialized = false;
        this.router.navigate(['not-found'])
        this.showMessage.message('Something went wrong, contact with administrator')
      }
      }
    })
  }
}
