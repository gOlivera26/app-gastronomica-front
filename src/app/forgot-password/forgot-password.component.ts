import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailFormControl: FormControl;

  constructor(
    private dialog : MatDialog,
    private authService: AuthService,
    public dialogRef : MatDialogRef<ForgotPasswordComponent>
  ) {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  }

  submit() {
    if (this.emailFormControl.valid) {
      const email = this.emailFormControl.value;
  
      Swal.fire({
        title: 'Por favor espera',
        html: 'Estamos procesando tu solicitud...',
        allowOutsideClick: false,
      });
  
      Swal.showLoading();
  
      this.authService.forgotPassword({ email }).subscribe({
        next: (response) => { // Captura la respuesta del servicio
          const username = response; // Almacena el nombre de usuario devuelto por el servicio
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Se ha enviado un código de verificación al correo electrónico proporcionado.'
          }).then(() => {
            this.dialogRef.close();
            this.openVerificationCodeDialog(username); 
          });
        },
        error: (error) => {
          console.error('Error al enviar solicitud:', error);
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al enviar la solicitud de restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.'
          });
        }
      });
    }
  }
  
  openVerificationCodeDialog(username: string): void {
    const dialogRef = this.dialog.open(VerificationCodeComponent, {
      width: '400px',
      data: { username }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The verification code dialog was closed');
    });
  }
  


  cancel(){
    this.dialogRef.close();
  }
}
