import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, UpdateCredentialsRequest, UpdateCredentialsResponse } from '../models/models';
import { Usuario, updateUsuarioRequest } from '../models/usuario';
import { Cliente } from '../models/cliente';

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

  postUsuario(usuario: Usuario): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/auth/registerUsuario`, usuario);
  }

  //usuario service
  getImagenProfile(request: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/usuarios/obtenerImagenProfile/${request}`, {responseType: 'text'});
  }
  getUsuario(request: string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuarios/obtenerUsuarioPorUsername/${request}`);
  }
  getRoles(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/usuarios/obtenerRoles`);
  }
  putImagenProfile(username: string, image: any): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/usuarios/agregarImagenProfile/${username}/imagen`, image, { responseType: 'text' });
  }
  updateUsuario(usuario: updateUsuarioRequest): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/auth/updateUsuario`, usuario);
  }
  getUsuarios(): Observable<any> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuarios/obtenerUsuarios`);
  }
  bajaUsuario(nroDoc: string): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}/usuarios/bajaUsuario/${nroDoc}`, null);
  }
  getUsuarioFiltroActivo(activo: boolean): Observable<any>{
    return this.httpClient.get<boolean>(`${this.baseUrl}/usuarios/obtenerUsuarioPorEstado/${activo}`);
  }
  getNroDocExiste(nroDoc: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/usuarios/nroDocExiste/${nroDoc}`);
  }
  getEmailExiste(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/usuarios/emailExiste/${email}`);
  }
  getUsernameExiste(username: string):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.baseUrl}/usuarios/usernameExiste/${username}`)
  }
  getUsuarioByRol(idRol: number): Observable<any> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuarios/obtenerUsuarioPorRol/${idRol}`);
  }
  deleteUsuarioByUsername(username: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/usuarios/eliminarUsuario/${username}`);
  }
  
  //producto
  getProductos(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/producto/obtenerProductos`);
  }
  getProductoPorTipo(idProducto: number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/producto/obtenerProductoPorTipo/${idProducto}`);
  }
  getProductoNovedades(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/producto/obtenerProductoNovedad`);
  }

  getTipoProductos(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/producto/obtenerTipoProductos`);
  }

  //pedido
  postPedido(request: any): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/pedidos/crearPedido`, request);
  }


  //cliente
  getClientePorNroDoc(nroDoc: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/cliente/getCliente/${nroDoc}`);
  }
  postCliente(cliente: Cliente): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/cliente/postCliente`, cliente);
  }

}
