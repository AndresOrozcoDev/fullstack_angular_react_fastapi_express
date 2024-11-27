import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('API_KEY', environment.EXPRESS_API_KEY),
  });
  return next(req);
};
