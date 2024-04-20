import { Component, OnInit } from '@angular/core';
import { Producto, ProductoSeleccionado } from '../../models/producto';
import { CarritoService } from '../../services/carrito.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarPedidoComponent } from '../confirmar-pedido/confirmar-pedido.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-pedidos',
  templateUrl: './home-pedidos.component.html',
  styleUrls: ['./home-pedidos.component.css']
})
export class HomePedidosComponent implements OnInit {

  productosSeleccionados: ProductoSeleccionado[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService, private dialog: MatDialog) { }

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

  confirmarCompra(): void {
    const dialogRef = this.dialog.open(ConfirmarPedidoComponent, {
      width: '300px'
    });

    dialogRef.componentInstance.confirmarPedido.subscribe((data: { direccionEntrega: string, observacion: string }) => {
      this.crearPedido(data.direccionEntrega, data.observacion);
      dialogRef.close();
    });
  }


  crearPedido(direccionEntrega: string, observacion: string): void {
    const pedido = {
      idCliente: 7, 
      fechaPedido: new Date().toISOString(),
      direccionEntrega: direccionEntrega,
      observacion: observacion,
      detallePedido: this.productosSeleccionados.map(item => ({ idProducto: item.producto.id, cantidad: item.cantidad }))
    };
  
    this.carritoService.crearPedido(pedido).subscribe(response => {
      console.log('Pedido creado:', response);
      Swal.fire('Éxito', 'Pedido creado exitosamente', 'success');
  
      this.productosSeleccionados = [];
      this.total = 0;
      this.carritoService.vaciarCarrito();
    }, error => {
      console.error('Error al crear el pedido:', error);
      Swal.fire('Error', 'Error al crear el pedido', 'error');
    });
  }
  
}
