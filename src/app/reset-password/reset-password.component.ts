import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string;
  resetPasswordForm: FormGroup; // Declara el formulario 
  isLoginFormVisible = false;


  constructor(
    private dialogRef: MatDialogRef<ResetPasswordComponent>, // Inyecta MatDialogRef
    @Inject(MAT_DIALOG_DATA) data: { token: string },
    private authService: AuthService,
    private formBuilder: FormBuilder // Inyecta FormBuilder
  ) {
    this.token = data.token;
    this.resetPasswordForm = this.formBuilder.group({ // Inicializa el formulario reactivo
      newPassword: ['', Validators.required] // Agrega validadores si es necesario
    });
  }

  
toggleLoginForm() {
  this.isLoginFormVisible = !this.isLoginFormVisible;
}
  submit() {
    // Verifica si el formulario es válido antes de enviarlo
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;

      // Llama al servicio para actualizar la contraseña
      this.authService.updatePassword({ token: this.token, newPassword }).subscribe({
        next: () => {
          console.log('Contraseña actualizada exitosamente');
          // Muestra SweetAlert de éxito
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            text: 'La contraseña se ha actualizado exitosamente.'
          });
          this.dialogRef.close(); // Cierra el diálogo al actualizar la contraseña correctamente
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);
          // Muestra SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar la contraseña. Por favor, inténtalo de nuevo.'
          });
        }
      });
    }
  }
  
  cancel(){
    // Muestra un SweetAlert para confirmar si deseas cerrar el modal
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras, los cambios no se guardarán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(); // Cierra el diálogo si se confirma la acción
      }
    });
  }
}
