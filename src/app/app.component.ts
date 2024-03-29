import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VerDetallesUsuarioComponent } from './ver-detalles-usuario/ver-detalles-usuario.component';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('menuAnimation', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('visible => hidden', animate('300ms ease-out')),
      transition('hidden => visible', animate('300ms ease-in'))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app-gastronomica';
  isLoggedIn = false;
  isHomeComponent = false;
  userProfileImage: string | ArrayBuffer | null = null;
  username!: string;
  userRole!: string;
  userProfileImageSubscription: Subscription | undefined;

  constructor(private router: Router, private usuarioService: UsuarioService, private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = !!localStorage.getItem('token');
        this.isHomeComponent = this.router.url === '/homeUser';
        if (this.isLoggedIn) {
          const token = localStorage.getItem('token');
          if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            this.username = tokenPayload.sub;
            this.userRole = tokenPayload.role;
            if (this.username) {
              this.getUserProfileImage(this.username);
            }
          }
        }
      }
    });

    this.userProfileImageSubscription = this.usuarioService.userProfileImage$.subscribe(
      (image: string | null) => {
        this.userProfileImage = image;
      }
    );
  }

  ngOnDestroy() {
    if (this.userProfileImageSubscription) {
      this.userProfileImageSubscription.unsubscribe();
    }
  }

  getUserProfileImage(username: string) {
    this.usuarioService.getImagenProfile(username).subscribe(
      (data: string) => {
        this.userProfileImage = 'data:image/jpeg;base64,' + data;
      },
      error => {
        console.error('Error al obtener la imagen del perfil:', error);
      }
    );
  }

  openUserDetailsModal() {
    const dialogRef = this.dialog.open(VerDetallesUsuarioComponent, {
      width: '500px',
      data: { username: this.username }
    });
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Estás seguro de que quieres cerrar la sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.router.navigate(['/']);
  
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado la sesión exitosamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    })
  }

  viewProfile() {
    this.openUserDetailsModal();
  }

  onLoginButtonClick() {
    if (this.router.url === '/login') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
