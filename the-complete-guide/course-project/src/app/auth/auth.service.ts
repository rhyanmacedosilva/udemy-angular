import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyBaIC72Z3UxCZiylzWRiLbkqMl6DIS6Ew4';
  private apiSignUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey;
  private apiSignInUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.apiSignUpUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn
      );
    }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate =
      new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.apiSignInUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn
      );
    }));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    const firebaseErrorMessage = errorResponse.error.error.message;
    let errorMessage = 'An unkown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (firebaseErrorMessage) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This e-mail exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This e-mail does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
