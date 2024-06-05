import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthControllerService} from "@app/service/api/services/auth-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {TokenService} from "@app/service/auth/token.service";
import {CustomTranslateService} from "@app/shared/translate/custom-translate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    usernameOrEmail: [[], Validators.required],
    password: [[], Validators.required]
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthControllerService,
              private showMessage: ShowMessageService,
              private tokenService: TokenService,
              private myTranslateService: CustomTranslateService) { }

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return
    }
    this.authService.login({body: this.loginForm.value}).subscribe({
        next: (resp) => {
          this.tokenService.token = resp.access_token;
          this.router.navigate(['/hr/dashboard'])
        },
      error: (err) => {
        this.showMessage.message(err.error.message)
        }
      }
    )
  }

  changeLanguage() {
    this.myTranslateService.changeLanguage()
  }
}
