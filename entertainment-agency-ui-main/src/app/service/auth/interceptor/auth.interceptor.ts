import { HttpInterceptorFn } from '@angular/common/http';
import {TOKEN} from "@app/shared/utils/local-storage-items";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN)
  if(token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    })
    return next(authReq)
  }
  return next(req);
};
