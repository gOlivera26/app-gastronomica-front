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
}
