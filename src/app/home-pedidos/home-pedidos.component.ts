import { Component, OnInit } from '@angular/core';
import { Producto, ProductoSeleccionado } from '../../models/producto';
import { CarritoService } from '../../services/carrito.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ConfirmarPedidoComponent } from '../confirmar-pedido/confirmar-pedido.component';
import { ConfirmarPedidoEnvioComponent } from '../confirmar-pedido-envio/confirmar-pedido-envio.component';
import { AsociarClienteModalComponent } from '../asociar-cliente-modal/asociar-cliente-modal.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-home-pedidos',
  templateUrl: './home-pedidos.component.html',
  styleUrls: ['./home-pedidos.component.css']
})
export class HomePedidosComponent implements OnInit {

  productosSeleccionados: ProductoSeleccionado[] = [];
  total: number = 0;
  idCliente: number | null = null;

  constructor(
    private carritoService: CarritoService, 
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.productosSeleccionados = carrito;
      this.actualizarTotal();
    });
  }

  actualizarTotal(): void {
    this.total = this.productosSeleccionados.reduce((total, productoSeleccionado) => 
      total + (productoSeleccionado.producto.precio * productoSeleccionado.cantidad), 0);
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
    const dialogRef = this.dialog.open(AsociarClienteModalComponent, {
      width: '300px'
    });
  
    dialogRef.componentInstance.confirmarDocumento.subscribe((idCliente: string) => {
      this.idCliente = Number(idCliente);
      console.log('ID del cliente:', this.idCliente);
      this.confirmarCompraDelivery();

    });
  }

  confirmarCompraDelivery(): void {
    console.log('ID del cliente al confirmar la compra:', this.idCliente);
    Swal.fire({
      title: '¿Es con delivery?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(ConfirmarPedidoEnvioComponent, {
          width: '300px',
          data: { numeroDocumento: this.idCliente }
        });

        dialogRef.componentInstance.confirmarPedido.subscribe((data: { direccionEntrega: string, observacion: string, nombreCliente: string}) => {
          this.crearPedido(data.direccionEntrega, data.observacion, data.nombreCliente);
          dialogRef.close();
        });
      } else {
        this.confirmarCompraWithoutDelivery();
      }
    });
  }

  confirmarCompraWithoutDelivery(): void {
    const dialogRef = this.dialog.open(ConfirmarPedidoComponent, {
      width: '300px',
      data: {
        productosSeleccionados: this.productosSeleccionados,
        total: this.total,
        numeroDocumento: this.idCliente
      }
    });

    dialogRef.componentInstance.confirmarPedido.subscribe((data: {nombreCliente: string}) => {
      this.crearPedido('', '', data.nombreCliente);
      dialogRef.close();
    });
  }

  crearPedido(direccionEntrega: string, observacion: string, nombreCliente: string): void {
    if (this.idCliente === null) {
      console.error('ID de cliente no disponible.');
      return;
    }

    const pedido = {
      idCliente: this.idCliente,
      fechaPedido: new Date().toISOString(),
      direccionEntrega: direccionEntrega,
      observacion: observacion,
      detallePedido: this.productosSeleccionados.map(item => ({ idProducto: item.producto.id, cantidad: item.cantidad })),
      nombreCliente: nombreCliente
    };

    this.carritoService.crearPedido(pedido).subscribe(response => {
      console.log('Pedido creado:', response);
      Swal.fire('Éxito', 'Pedido creado exitosamente', 'success');

      this.productosSeleccionados = [];
      this.total = 0;
      this.carritoService.vaciarCarrito();
      this.dialog.closeAll();

    }, error => {
      console.error('Error al crear el pedido:', error);
      Swal.fire('Error', 'Error al crear el pedido', 'error');
    });
  }
}
