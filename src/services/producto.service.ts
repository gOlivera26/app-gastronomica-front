import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Producto, TipoProducto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productoSubject = new BehaviorSubject<Producto[]>([]);
  productos$: Observable<Producto[]> = this.productoSubject.asObservable();

  private tipoProductosSubject = new BehaviorSubject<TipoProducto[]>([]);
  tipoProductos$: Observable<TipoProducto[]> = this.tipoProductosSubject.asObservable();

  constructor(private httpClient: HttpClient, private restService: RestService) { }

  getProductos(): Observable<Producto[]>{
    return this.restService.getProductos().pipe(
      tap((productos: Producto[]) => {
        this.productoSubject.next(productos);
      })
    )
  }
  
  getTipoProductos(): Observable<TipoProducto[]>{
    return this.restService.getTipoProductos().pipe(
      tap((tipoProductos: TipoProducto[]) => {
        this.tipoProductosSubject.next(tipoProductos);
      })
    )
  }

}
