import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthControllerService} from "@app/service/api/services/auth-controller.service";
import {ShowMessageService} from "@app/service/show-messages/show-message.service";
import {regex, regexErrors} from "@app/shared/utils";
import {passwordMatch} from "@app/service/validators/password-validator";
import {Router} from "@angular/router";
import {TokenService} from "@app/service/auth/token.service";
import {CustomTranslateService} from "@app/shared/translate/custom-translate.service";

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrl: './initialize.component.scss'
})
export class InitializeComponent {

  protected readonly regexErrors = regexErrors;

  initializationForm: FormGroup = this.fb.group({
    username: [[], Validators.required],
    email: [[], {
      updateOn: 'blur',
      validators: [Validators.required, Validators.pattern(regex.email)]
    }],
    password: [[], {
      validators: [Validators.required, Validators.pattern(regex.password)]
    }],
    confirmPassword: [[], {
      validators: [Validators.compose([Validators.required])]
    }],
  },{
        validators: passwordMatch('password', 'confirmPassword')
  })

  constructor(private fb: FormBuilder,
              private authService: AuthControllerService,
              private showMessage: ShowMessageService,
              private route: Router,
              private tokenService: TokenService,
              private myTranslateService: CustomTranslateService) {
  }

  initialize() {
    this.authService.adminInitialize({body: this.initializationForm.value}).subscribe({
        next: (resp) => {
          this.tokenService.token = resp.access_token;
          this.route.navigate(['/hr/dashboard'])
        },
        error: (err) => {
          this.showMessage.message(err.error.message);
        }
      }
    )
  }

  changeLanguage() {
    this.myTranslateService.changeLanguage()
  }
}
