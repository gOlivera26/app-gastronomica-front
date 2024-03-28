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

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'username', 'email', 'nroDoc', 'telefono', 'activo', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
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

  editarUsuario(usuario: Usuario) {
    // Lógica para editar usuario
    console.log('Editar usuario:', usuario);
  }

  eliminarUsuario(usuario: Usuario) {
    // Lógica para eliminar usuario
    console.log('Eliminar usuario:', usuario);
  }

  bajaUsuario(usuario: Usuario) {
    this.usuarioService.bajaUsuario(usuario.nroDoc).subscribe(
      (activo: boolean) => {
        usuario.activo = activo;
        console.log('Usuario activo:', activo);
        // Actualizar la lista de usuarios después de activar o desactivar
        this.loadUsuarios();
      },
      error => {
        console.log('Error al activar o desactivar usuario:', error);
      }
    );
  }
}
