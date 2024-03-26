import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RestService } from './rest.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient, private restService: RestService) { }

  getImagenProfile(request: string): Observable<any>{
    return this.restService.getImagenProfile(request);
  }

}
