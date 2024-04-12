import { Component, OnInit } from '@angular/core';
import { Producto, ProductoSeleccionado } from '../../models/producto';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-home-pedidos',
  templateUrl: './home-pedidos.component.html',
  styleUrls: ['./home-pedidos.component.css']
})
export class HomePedidosComponent implements OnInit {

  productosSeleccionados: ProductoSeleccionado[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.productosSeleccionados = carrito;
      this.actualizarTotal();
    });
  }

  actualizarTotal(): void {
    this.total = this.productosSeleccionados.reduce((total, productoSeleccionado) => total + (productoSeleccionado.producto.precio * productoSeleccionado.cantidad), 0);
  }

  agregarAlCarrito(producto: Producto): void {
    const index = this.productosSeleccionados.findIndex(item => item.producto.id === producto.id);
    if (index !== -1) {
      this.productosSeleccionados[index].cantidad++;
    } else {
      const productoSeleccionado: ProductoSeleccionado = {
        producto: producto,
        cantidad: 1
      };
      this.productosSeleccionados.push(productoSeleccionado);
    }
    this.actualizarTotal();
    this.carritoService.actualizarCarrito(this.productosSeleccionados);
  }
  

  eliminarProducto(index: number): void {
    this.productosSeleccionados.splice(index, 1);
    this.actualizarTotal();
    this.carritoService.actualizarCarrito(this.productosSeleccionados);
  }
}
