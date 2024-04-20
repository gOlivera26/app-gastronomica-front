import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent {
  @Output() confirmarPedido = new EventEmitter<{ direccionEntrega: string, observacion: string }>();

  formularioPedido: FormGroup;

  constructor(private dialogRef: MatDialogRef<ConfirmarPedidoComponent>, private formBuilder: FormBuilder) {
    this.formularioPedido = this.formBuilder.group({
      direccionEntrega: ['', Validators.required],
      observacion: ['']
    });
  }

  onConfirmar() {
    if (this.formularioPedido.valid) {
      const { direccionEntrega, observacion } = this.formularioPedido.value;
      this.confirmarPedido.emit({ direccionEntrega, observacion });
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
