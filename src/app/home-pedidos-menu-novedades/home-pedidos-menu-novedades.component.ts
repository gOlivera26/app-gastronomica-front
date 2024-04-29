import { Component, EventEmitter, Output } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-pedidos-menu-novedades',
  templateUrl: './home-pedidos-menu-novedades.component.html',
  styleUrl: './home-pedidos-menu-novedades.component.css'
})
export class HomePedidosMenuNovedadesComponent {

  productos!: Producto[];
  @Output() productoAgregado = new EventEmitter<Producto>();

  constructor(private productoService: ProductoService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.productoService.getProductoNovedad().subscribe((productos: Producto[]) => {
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
