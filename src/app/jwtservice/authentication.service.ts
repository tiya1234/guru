import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Route, Router } from '@angular/router';
import { loginUrl } from '../serivces/config';


export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private route:Router) {}
// Provide username and password for authentication, and once authentication is successful,
// store JWT token in session

  authenticate(username:any, password:any) {
    return this.httpClient
      .post<any>(`${loginUrl}`, { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('roles' , userData.roles);
          const tokenStr = 'Bearer ' + userData.accessToken;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('token');
      this.route.navigate(['']);
  }
}
