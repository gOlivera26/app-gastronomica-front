import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmarPedidoComponent } from '../confirmar-pedido/confirmar-pedido.component';
import { ClienteService } from '../../services/cliente.service'; // Asegúrate de importar el servicio de cliente
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirmar-pedido-envio',
  templateUrl: './confirmar-pedido-envio.component.html',
  styleUrls: ['./confirmar-pedido-envio.component.css']
})
export class ConfirmarPedidoEnvioComponent {
  @Output() confirmarPedido = new EventEmitter<{ direccionEntrega: string, observacion: string, nombreCliente: string }>();
  formularioPedido: FormGroup;
  numeroDocumento: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmarPedidoComponent>,
    private formBuilder: FormBuilder
  ) {
    this.formularioPedido = this.formBuilder.group({
      direccionEntrega: ['', Validators.required],
      observacion: [''],
      nombreCliente:['']
    });
    this.numeroDocumento = this.data.numeroDocumento;
  }

  onConfirmar() {
    if (this.formularioPedido.valid) {
      const { direccionEntrega, observacion } = this.formularioPedido.value;
      this.confirmarPedido.emit({ direccionEntrega, observacion, nombreCliente: this.formularioPedido.get('nombreCliente')?.value });
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
