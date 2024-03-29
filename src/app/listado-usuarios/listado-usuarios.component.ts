import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'username', 'email', 'nroDoc', 'telefono', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(activo: boolean | null = null) {
    if (activo !== null) {
      this.usuarioService.getUsuarioFiltroActivo(activo).subscribe(
        (usuarios: Usuario[]) => {
          this.dataSource.data = usuarios;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log('Error al obtener usuarios:', error);
        }
      );
    } else {
      this.usuarioService.getUsuarios().subscribe(
        (usuarios: Usuario[]) => {
          this.dataSource.data = usuarios;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log('Error al obtener usuarios:', error);
        }
      );
    }
  }

  editarUsuario(usuario: Usuario) {
    // Lógica para editar usuario
    console.log('Editar usuario:', usuario);
  }

  eliminarUsuario(usuario: Usuario) {
    // Lógica para eliminar usuario
    console.log('Eliminar usuario:', usuario);
  }

  bajaUsuario(usuario: Usuario) {
    const subscriptionOptions = {
      next: (activo: boolean) => {
        usuario.activo = activo;
        console.log('Usuario activo: ', activo)
        this.loadUsuarios();
      },
      error: (error: any) => {
        console.log('Error al activar o desactivar usuario:', error);
      }
    };
    this.usuarioService.bajaUsuario(usuario.nroDoc).subscribe(subscriptionOptions);
  }

  filtrarUsuariosPorEstado(activo: boolean | null) {
    this.loadUsuarios(activo);
  }
}
