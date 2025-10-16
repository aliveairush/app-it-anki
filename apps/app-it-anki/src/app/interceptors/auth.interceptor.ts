import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthTokenStorage } from '../services/auth.service';

// флаг в контексте запроса
export const AUTH_REQUIRED = new HttpContextToken<boolean>(() => false);

// @ts-ignore
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(AUTH_REQUIRED)) {
    return next(req);
  }

  const token = AuthTokenStorage.get();
  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};

export function withAuth() {
  return { context: new HttpContext().set(AUTH_REQUIRED, true) };
}
