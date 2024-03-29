import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Rol, Usuario, updateUsuarioRequest } from '../models/usuario';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private rolesSubject = new BehaviorSubject<Rol[]>([]);
  roles$: Observable<Rol[]> = this.rolesSubject.asObservable();

  private userProfileImageSubject = new BehaviorSubject<string | null>(null);
  userProfileImage$: Observable<string | null> = this.userProfileImageSubject.asObservable();

  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  usuarios$: Observable<Usuario[]> = this.usuariosSubject.asObservable();


  constructor(private httpClient: HttpClient, private restService: RestService) { }

  getImagenProfile(request: string): Observable<any>{
    return this.restService.getImagenProfile(request).pipe(
      tap((data: string) => {
        this.userProfileImageSubject.next('data:image/jpeg;base64,' + data);
      })
    );
  }

  getUserProfile(username: string): Observable<{ id: number, usuario: Usuario }> {
    return this.restService.getUsuario(username).pipe(
      map((usuario: Usuario) => {
        return { id: usuario.id, usuario };
      })
    );
  }

  getRoles(): Observable<Rol[]> {
    return this.restService.getRoles().pipe(
      tap((roles: Rol[]) => {
        this.rolesSubject.next(roles);
      })
    );
  }

  putImagenProfile(username: string, formData: FormData): Observable<any>{
    return this.restService.putImagenProfile(username, formData).pipe(
      tap(() => {
        this.getImagenProfile(username).subscribe(); 
      })
    );
  }

  updateUsuario(usuario: updateUsuarioRequest): Observable<any> {
    return this.restService.updateUsuario(usuario);
  }
  getUsuarios(): Observable<Usuario[]> {
    return this.restService.getUsuarios().pipe(
      tap((usuarios: Usuario[]) => {
        this.usuariosSubject.next(usuarios);
      })
    );
  }
  bajaUsuario(nroDoc: string): Observable<boolean> {
    return this.restService.bajaUsuario(nroDoc);
  }
  getUsuarioFiltroActivo(activo: boolean):Observable<Usuario[]> {
    return this.restService.getUsuarioFiltroActivo(activo).pipe(
      tap((usuarios: Usuario[]) =>{
        this.usuariosSubject.next(usuarios);
      })
    );
  }
  
}
