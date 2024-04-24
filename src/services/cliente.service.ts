import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteSubject = new BehaviorSubject<number | null>(null);
  idCliente$: Observable<number | null> = this.clienteSubject.asObservable();

  constructor(private httpClient: HttpClient, private restService: RestService) { }

  getClientePorNroDoc(nroDoc: string): Observable<Cliente> {
    return this.restService.getClientePorNroDoc(nroDoc);
  }

  emitirIdCliente(idCliente: number) {
    this.clienteSubject.next(idCliente);
  }

  postCliente(cliente: Cliente): Observable<any> {
    return this.restService.postCliente(cliente);
  }
}
