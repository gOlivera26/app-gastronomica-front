import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

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
export class AppComponent implements OnInit {
  title = 'app-gastronomica';
  isLoggedIn = false; 
  isHomeComponent = false; 
  userProfileImage: string | ArrayBuffer | null = null;
  username!: string; // Variable para almacenar el nombre de usuario
  userRole!: string; // Variable para almacenar el rol del usuario
  

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = !!localStorage.getItem('token');
        this.isHomeComponent = this.router.url === '/homeUser';
        if (this.isLoggedIn) {
          const token = localStorage.getItem('token');
          if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            console.log(tokenPayload.role); // La descripción del rol del usuario

            this.username = tokenPayload.sub; // Extraer el nombre de usuario del campo 'sub'
            console.log('username extraido' + this.username);
            this.userRole = tokenPayload.role; // Asumiendo que 'role' contiene la descripción del rol
            console.log('role extraido' + this.userRole);
            if (this.username) {
              this.getUserProfileImage(this.username);
            }
          }
        }
      }
    });
  }
  
  getUserProfileImage(username: string) {
    this.usuarioService.getImagenProfile(username).subscribe(
      (data: string) => {
        this.userProfileImage = 'data:image/jpeg;base64,' + data;
        console.log('Imagen de perfil cargada:', this.userProfileImage);
      },
      error => {
        console.error('Error al obtener la imagen del perfil:', error);
      }
    );
  }
  
  logout() {
    localStorage.removeItem('token'); 
    this.isLoggedIn = false;
    this.router.navigate(['/']); 
  }

  showUserProfile() {
    // Muestra el menú desplegable para el perfil del usuario
  }

  viewProfile() {
    // Abre el diálogo para ver los detalles del perfil del usuario
  }

  onLoginButtonClick() {
    if (this.router.url === '/login') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  } 
}
