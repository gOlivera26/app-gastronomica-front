import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
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
  resetPasswordForm: FormGroup; 
  isLoginFormVisible = false;


  constructor(
    private dialogRef: MatDialogRef<ResetPasswordComponent>, 
    @Inject(MAT_DIALOG_DATA) data: { token: string },
    private authService: AuthService,
    private formBuilder: FormBuilder 
  ) {
    this.token = data.token;
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required] 
    });
  }

  
toggleLoginForm() {
  this.isLoginFormVisible = !this.isLoginFormVisible;
}
  submit() {
    // Verifica si el formulario es válido antes de enviarlo
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      this.authService.updatePassword({ token: this.token, newPassword }).subscribe({
        next: () => {
          console.log('Contraseña actualizada exitosamente');
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            text: 'La contraseña se ha actualizado exitosamente.'
          });
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras, los cambios no se guardarán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(); 
      }
    });
  }
}
