import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyBaIC72Z3UxCZiylzWRiLbkqMl6DIS6Ew4';
  private apiSignUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey;
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.apiSignUpUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
      const firebaseErrorMessage = errorResponse.error.error.message;
      let errorMessage = 'An unkown error ocurred!';
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }
      switch (firebaseErrorMessage) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This e-mail exists already!';
      }
      return throwError(errorMessage);
    }));
  }
}
