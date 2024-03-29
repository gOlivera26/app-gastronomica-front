import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { ForgotPasswordRequest, LoginRequest, LoginResponse, UpdateCredentialsRequest, UpdateCredentialsResponse } from '../models/models';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private statusLogin = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.statusLogin.asObservable();

  constructor(private httpClient: HttpClient, private restService: RestService) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    this.statusLogin.next(true);
    return this.restService.login(loginRequest);
  }
  forgotPassword(request: ForgotPasswordRequest): Observable<any> {
    return this.restService.forgotPassword(request);
  }
  resetPassword(request: UpdateCredentialsRequest): Observable<any>{
    return this.restService.resetPassword(request);
  }
  updatePassword(request: UpdateCredentialsResponse) :Observable<any>{
    return this.restService.updatePassword(request);
  }
  
}
