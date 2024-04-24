import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoSeleccionado } from '../../models/producto';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent {
  @Input() productosSeleccionados: ProductoSeleccionado[] = [];
  @Input() total: number = 0;
  @Output() confirmarPedido = new EventEmitter<{nombreCliente: string}>();

  formularioPedido: FormGroup;
  numeroDocumento: string;

  constructor(private dialogRef: MatDialogRef<ConfirmarPedidoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.productosSeleccionados = data.productosSeleccionados || [];
    this.total = data.total || 0;

    this.formularioPedido= this.formBuilder.group({
      nombreCliente:['']
    });
    this.numeroDocumento = this.data.numeroDocumento;
  }
  
  onConfirmar(): void {
    if(this.formularioPedido.valid){
      this.confirmarPedido.emit({nombreCliente: this.formularioPedido.get('nombreCliente')?.value });
      this.dialogRef.close();
    }
  }
  
  onCancel() {
    this.dialogRef.close();
  }

}
