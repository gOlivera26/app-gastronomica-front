import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, UpdateCredentialsRequest, UpdateCredentialsResponse } from '../models/models';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl = 'http://localhost:8081';

  public login(request: LoginRequest): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`, request);
  }
  forgotPassword(request: ForgotPasswordRequest): Observable<string> {
    return this.httpClient.post(`${this.baseUrl}/auth/forgot-password`, request, { responseType: 'text' });
  }
  resetPassword(request : UpdateCredentialsRequest): Observable<UpdateCredentialsRequest>{
    return this.httpClient.post<UpdateCredentialsRequest>(`${this.baseUrl}/auth/reset-password`, request);
  }
  updatePassword(request: UpdateCredentialsResponse): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/update-password`, request, { responseType: 'text' });
  }
  

  //usuario service
  getImagenProfile(request: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/usuarios/obtenerImagenProfile/${request}`, {responseType: 'text'});
  }
}
