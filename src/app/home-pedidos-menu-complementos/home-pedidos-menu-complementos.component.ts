import { Component, EventEmitter, Output } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-pedidos-menu-complementos',
  templateUrl: './home-pedidos-menu-complementos.component.html',
  styleUrl: './home-pedidos-menu-complementos.component.css'
})
export class HomePedidosMenuComplementosComponent {
  productos!: Producto[];
  @Output() productoAgregado = new EventEmitter<Producto>();

  constructor(private productoService: ProductoService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.productoService.getProductoPorTipo(3).subscribe(productos => {
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
