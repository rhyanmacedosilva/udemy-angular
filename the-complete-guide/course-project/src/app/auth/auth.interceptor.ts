import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaust, exhaustMap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1), exhaustMap(
        user => {
          if (!user) {
            return next.handle(request);
          }
          const modifiedRequest =
            request.clone({
              params: new HttpParams()
                .set('auth', user.token)
            });
          return next.handle(modifiedRequest);
        }
      )
    );
  }
}
