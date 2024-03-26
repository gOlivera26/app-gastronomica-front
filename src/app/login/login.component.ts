import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/models';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm! : FormGroup;

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private matDialog :MatDialog 
  ) {
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }
  
  
  login() {
    if (this.loginForm.valid) {

      this.loginRequest.username = this.loginForm.value.username;
      this.loginRequest.password = this.loginForm.value.password;

      this.authService.login(this.loginRequest).subscribe({
        next: response => {
          localStorage.setItem('token', response.token);
          console.log('token: ' + localStorage.getItem('token'));
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Has iniciado sesión correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/homeUser']);
          });
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error durante el inicio de sesión',
            text: 'Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.'
          });
          console.error('Error durante el inicio de sesión:', error);
        }
      });
    }
  }
  abrirForgotPassword(){
    this.matDialog.open(ForgotPasswordComponent, {
      width: '400px',
      disableClose: true
    });
  }

}
