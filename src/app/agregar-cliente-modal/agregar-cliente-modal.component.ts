import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-agregar-cliente-modal',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.css']
})
export class AgregarClienteModalComponent implements OnInit {

  userForm!: FormGroup;

  @Output() clienteAgregado = new EventEmitter<number>();
  
  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private dialogRef: MatDialogRef<AgregarClienteModalComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      nroDoc: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formInvalido(): boolean {
    return this.userForm.invalid;
  }

  crearUsuario(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    this.clienteService.postCliente(userData).subscribe({
      next: (response: any) => {
        // Cliente agregado exitosamente
        Swal.fire('¡Cliente creado!', 'El cliente ha sido creado exitosamente.', 'success').then(() => {
      
          this.clienteAgregado.emit(response.id);
          this.dialogRef.close();
        });
      },
      error: error => {
        console.error('Error al crear cliente:', error);
        Swal.fire('¡Error!', 'Ocurrió un error al crear el cliente. Por favor, intenta nuevamente.', 'error');
      }
    });
  }

  confirmarSalir(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas salir del registro de cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }
}
