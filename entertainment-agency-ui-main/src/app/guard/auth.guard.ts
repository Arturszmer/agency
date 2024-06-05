import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "@app/service/auth/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const expectedRoles = route.data['scope'] as Array<string>;
  const userRoles: string[] = tokenService.userRoles;

  if(!expectedRoles || expectedRoles.length ===0){
    return true;
  }

  const hasRole = userRoles.some((role) => expectedRoles.includes(role));

  if(!hasRole){
    router.navigate(['/access-denied']);
    return false;
  }
  return true;
};
