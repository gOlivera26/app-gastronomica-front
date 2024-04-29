import { Component, EventEmitter, Output } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AgregarClienteModalComponent } from '../agregar-cliente-modal/agregar-cliente-modal.component';
import { HomePedidosComponent } from '../home-pedidos/home-pedidos.component';

@Component({
  selector: 'app-asociar-cliente-modal',
  templateUrl: './asociar-cliente-modal.component.html',
  styleUrls: ['./asociar-cliente-modal.component.css']
})
export class AsociarClienteModalComponent {

  numeroDocumento: string = '';
  idCliente: number | undefined;
  @Output() confirmarDocumento = new EventEmitter<string>();

  constructor(private clienteService: ClienteService, private dialogRef: MatDialogRef<AsociarClienteModalComponent>, private dialog: MatDialog) { }

  confirmar() {
    if (this.numeroDocumento.trim() !== '') {
      this.clienteService.getClientePorNroDoc(this.numeroDocumento).subscribe(cliente => {
        if (cliente) {
          this.idCliente = cliente.id;
          console.log('ID del cliente:', cliente.id);
          this.confirmarDocumento.emit(this.idCliente.toString());
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró ningún cliente con el número de documento proporcionado.'
          });
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener el cliente con el numero documento: '+ this.numeroDocumento
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un número de documento válido.'
      });
    }
  }
  
  cancelar() {
    this.dialogRef.close();
  }

  mostrarRegistro(): void {
    Swal.fire({
      title: '¿Desea registrarse como cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.abrirModalRegistroCompleto();
      } else {
       this.confirmarDocumento.emit('');
      }
    });
  }
  
  abrirModalRegistroCompleto(): void {
    this.dialog.open(AgregarClienteModalComponent, {
      width: '400px', 
      data: {} 
    });
  }
  
}
