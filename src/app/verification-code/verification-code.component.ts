import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent {
  verificationCodeForm: FormGroup;
  username: string;

  constructor(
    private dialog : MatDialog,
    public dialogRef: MatDialogRef<VerificationCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string },
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.username = data.username;
    this.verificationCodeForm = this.formBuilder.group({
      verificationCode: ['', Validators.required]
    });
  }

  submit() {
    if (this.verificationCodeForm.valid) {
      const verificationCode = this.verificationCodeForm.value.verificationCode;
      this.authService.resetPassword({ username: this.username, verificationCode }).subscribe({
        next: (response: { token: string }) => { //Captura la respuesta del servicio 
          Swal.fire({
            icon: 'success',
            title: 'Código verificado',
            text: 'El código de verificación se ha validado correctamente.'
          });
          this.openResetPasswordDialog(response.token);
          this.dialogRef.close(); 
        },
        error: (error) => {
          console.error('Error al verificar el código:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al verificar el código de verificación. Por favor, inténtalo de nuevo.'
          });
        }
      });
    }
  }
  
  
  openResetPasswordDialog(token: string): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '400px',
      data: { token }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de actualizar contraseña se cerró');
    });
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
