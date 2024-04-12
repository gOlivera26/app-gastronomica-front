import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-pedidos-menu-hamburguesas',
  templateUrl: './home-pedidos-menu-hamburguesas.component.html',
  styleUrl: './home-pedidos-menu-hamburguesas.component.css'
})
export class HomePedidosMenuHamburguesasComponent implements OnInit{
  productos!: Producto[];
  @Output() productoAgregado = new EventEmitter<Producto>();

  constructor(private productoService: ProductoService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  agregarAlCarrito(producto: Producto): void {
    Swal.fire({
      icon: 'success',
      title: producto.nombre + ' agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })
    this.carritoService.agregarAlCarrito(producto);
  }
}
