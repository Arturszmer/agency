import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {TokenService} from "@app/service/auth/token.service";

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  private scope: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenService: TokenService
  ) {
  }

  @Input()
  set appHasRole(scope: string[]) {
    this.scope = scope;
    this.updateView();
  }

  private updateView() {
    if(this.scope.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }
    const userRoles = this.tokenService.userRoles;
    const hasRole = this.scope.some(role => userRoles.includes(role));

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
