import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, Rol } from '../../models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioModalComponent } from '../editar-usuario-modal/editar-usuario-modal.component';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['nombre', 'apellido', 'username', 'email', 'nroDoc', 'telefono', 'rol', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();
  roles: Rol[] = [];
  selectedRol: number | null = null;
  selectedState: boolean | null = null;
  usernameUsuarioLogeado : string | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private usuariosSubscription: Subscription | undefined;

  constructor(private usuarioService: UsuarioService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadRoles();

    this.usuarioService.usuarioUpdate$.subscribe(() => {
      this.loadUsuarios();
    });
    this.obtenerUsernameToken();
  }

  obtenerUsernameToken(){
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = helper.decodeToken(token);
      this.usernameUsuarioLogeado = decodedToken.sub;
      console.log('usernameUsuarioLogeado', this.usernameUsuarioLogeado);
    }
  }


  loadUsuarios(activo: boolean | null = null): void {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }
    if (this.selectedRol !== null) {
      this.usuariosSubscription = this.usuarioService.getUsuarioByRol(this.selectedRol).subscribe({
        next: (usuarios: Usuario[]) => {
          // Combinar información del usuario con la información del rol
          usuarios.forEach(usuario => {
            const rol = this.roles.find(r => r.id === usuario.rol.id);
            if (rol) {
              usuario.rolDescripcion = rol.descripcion;
            }
          });
          this.updateDataSource(usuarios);
        },
        error: error => {
          console.log('Error al obtener usuarios filtrados por rol:', error);
          this.clearDataSource();
        }
      });
    } else {
      this.usuariosSubscription = this.usuarioService.getUsuarios().subscribe({
        next: (usuarios: Usuario[]) => {
          // Combinar información del usuario con la información del rol
          usuarios.forEach(usuario => {
            const rol = this.roles.find(r => r.id === usuario.rol.id);
            if (rol) {
              usuario.rolDescripcion = rol.descripcion;
            }
          });
          this.updateDataSource(usuarios);
        },
        error: error => {
          console.log('Error al obtener usuarios:', error);
          this.clearDataSource();
        }
      });
    }
  }
  

  updateDataSource(usuarios: Usuario[]): void {
    this.dataSource.data = usuarios;
    this.dataSource.paginator = this.paginator;
  }

  clearDataSource(): void {
    this.dataSource.data = [];
    this.dataSource.paginator = this.paginator;
  }

  verUsuario(usuario: Usuario): void {
    console.log('Editar usuario:', usuario);
    this.openUserDetailsModal(usuario.username);
  }

  openUserDetailsModal(username: string): void {
    console.log('Ver detalles del usuario');
    this.dialog.open(EditarUsuarioModalComponent, {
      width: '400px',
      data: {
        roles: this.roles,
        username: username
      }
    });
  }

  eliminarUsuario(usuario: Usuario): void {
    if(usuario.username === this.usernameUsuarioLogeado){
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar usuario',
        text: `No puedes eliminar tu propio usuario.`,
      });
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar al usuario ${usuario.username}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuarioByUsername(usuario.username).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario eliminado',
              text: `Usuario ${usuario.username} ha sido eliminado exitosamente.`,
            });
            this.loadUsuarios();
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar usuario',
              text: `Hubo un error al eliminar al usuario ${usuario.username}.`,
            });
            console.log('Error al eliminar usuario:', error);
          }
        });
      }
    });
  }
  
  bajaUsuario(usuario: Usuario): void {
    if(usuario.username === this.usernameUsuarioLogeado){
      Swal.fire({
        icon: 'error',
        title: 'Error al desactivar usuario',
        text: `No puedes desactivar tu propio usuario.`,
      });
      return;
    }
    this.usuarioService.bajaUsuario(usuario.nroDoc).subscribe({
      next: (activo: boolean) => {
        usuario.activo = activo;
        console.log('Usuario activo: ', activo)
        this.loadUsuarios();
      },
      error: (error: any) => {
        console.log('Error al activar o desactivar usuario:', error);
      }
    });
  }

  filtrarUsuariosPorEstado(activo: boolean | null): void {
    this.selectedState = activo;
    if (activo === null) {
      this.usuarioService.getUsuarios().subscribe({
        next: (usuarios: Usuario[]) => {
          this.actualizarUsuariosConRoles(usuarios);
        },
        error: error => {
          console.log('Error al obtener todos los usuarios:', error);
          this.clearDataSource();
        }
      });
    } else {
      this.usuarioService.getUsuarioFiltroActivo(activo).subscribe({
        next: (usuarios: Usuario[]) => {
          this.actualizarUsuariosConRoles(usuarios);
        },
        error: error => {
          console.log('Error al obtener usuarios filtrados por estado:', error);
          this.clearDataSource();
        }
      });
    }
  }
  
  actualizarUsuariosConRoles(usuarios: Usuario[]): void {
    usuarios.forEach(usuario => {
      const rol = this.roles.find(r => r.id === usuario.rol.id);
      if (rol) {
        usuario.rolDescripcion = rol.descripcion;
      }
    });
    this.updateDataSource(usuarios);
  }

  loadRoles(): void {
    this.usuarioService.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
        this.loadUsuarios(); // Cargar usuarios después de obtener los roles
      },
      error: error => {
        console.log('Error al obtener roles:', error);
      }
    });
  }

  buscarPorRol(): void {
    this.loadUsuarios();
  }

  limpiarFiltro(): void {
    this.selectedRol = null;
    this.loadUsuarios();
  }

  ngOnDestroy(): void {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }
  }
}
