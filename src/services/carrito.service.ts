import { Injectable } from '@angular/core';
import { Producto, ProductoSeleccionado } from '../models/producto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: ProductoSeleccionado[] = [];
  private carritoSubject = new BehaviorSubject<ProductoSeleccionado[]>([]);
  carrito$: Observable<ProductoSeleccionado[]> = this.carritoSubject.asObservable();

  private pedido: Pedido[] = [];
  private pedidoSubject = new BehaviorSubject<Pedido[]>([]);
  pedido$: Observable<Pedido[]> = this.pedidoSubject.asObservable();

  constructor(private restService: RestService) { }

  agregarAlCarrito(producto: Producto): void {
    const productoEnCarrito = this.carrito.find(item => item.producto.id === producto.id);
  
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      const productoSeleccionado: ProductoSeleccionado = {
        producto: producto,
        cantidad: 1
      };
      this.carrito.push(productoSeleccionado);
    }
  
    this.carritoSubject.next(this.carrito);
    console.log(this.carrito);
  }

  eliminarDelCarrito(index: number): void {
    this.carrito.splice(index, 1);
    this.carritoSubject.next(this.carrito);
  }
  
  actualizarCarrito(producto: ProductoSeleccionado[]): void {
    this.carrito = producto;
    this.carritoSubject.next(this.carrito);
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
  
  //pedido
  crearPedido(pedido: any): Observable<any>{
    return this.restService.postPedido(pedido);
  }

}
