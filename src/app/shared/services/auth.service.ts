import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


const requestOptions = {
  withCredentials: true,
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean | Response> {
    return this.http
      .get('https://sails-ws.herokuapp.com/user/identity', requestOptions)
      .pipe(
        tap((res: Response) => {
          if (res) {
            console.log('logged in');
            return of(true);
          }

          console.log('not logged in');
          return of(false);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 403) {
            console.log('isAuthenticated error', error);
          }
          console.log('not logged in', error);
          return of(false);
        }),
    );
  }

  login(email: string, password: string): Observable<boolean | Response> {
    console.log('auth.service login');

    const loginInfo = { 'email': email, 'password': password };

    return this.http.put('https://sails-ws.herokuapp.com/user/login', loginInfo, requestOptions)
      .pipe(
        tap((res: Response) => {
          if (res) {
            console.log('logged in');
            return of(true);
          }

          console.log('not logged in');
          return of(false);
        }),
        catchError((error) => {
          console.log('login error', error);
          return of(false);
        })
      );
  }

  signup(email: string, password: string): Observable<boolean | Response> {
    const loginInfo = { 'email': email, 'password': password };
    return this.http.post("https://sails-ws.herokuapp.com/user/", loginInfo, requestOptions)
      .pipe(
        tap((res: Response) => {
          if (res) {
            return of(true);
          }

          return of(false);
        }),
        catchError((error) => {
          console.log('signup error', error);
          return of(false);
        }),
    );
  }

}
