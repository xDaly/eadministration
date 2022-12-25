import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '@shared/models/User.model';
import { BaseService } from '@shared/services/base/base.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService extends BaseService<User> {

  currentUser: User;
  redirectedUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private jwtHelperService: JwtHelperService) {
    super({ uri: "account" }, baseUrl, http)
  }

  userRegister(user) {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  userAuthenticate(user) {
    return this.http.post<User>(`${this.url}/authenticate`, user)
      .pipe(
        tap((user: User) => {
          if (user) {
            this.currentUser = user;
          }
        }), catchError((error) => {
          throw error
        })
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.url}/profile/me`);
  }

  updateProfile(user) {
    return this.http.patch<User>(`${this.url}/update/me`, user);
  }

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0)
      return true;

    // get token from local storage or state management
    const token = localStorage.getItem('access_token');

    // decode token to read the payload details
    const decodeToken = this.jwtHelperService.decodeToken(token);

    switch(decodeToken.role){
      case 'Promotor': this.redirectedUrl = 'home'
      case 'SuperAdmin': this.redirectedUrl = 'admin'
    }

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken['role']);
  }

  refreshToken(): Observable<User> {
    const token = localStorage.getItem('access_token')

    return this.http.post<User>(`${this.url}/Token/Refresh`, { 'token': token })
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('access_token', JSON.stringify(user.token));
          }

          return <User>user;
        }));
  }

  sendConfirmationEmail(): Observable<string> {
    return this.http.get<string>(`${this.url}/sendConfirmationEmail`);
  }

  confirmEmail() {

  }

  getAuthToken(): string {
    return localStorage.getItem('access_token');
  }

  get IsLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
