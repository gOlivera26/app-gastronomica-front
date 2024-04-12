import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Rol } from '../../models/usuario';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  userForm!: FormGroup;
  roles: Rol[] = [];

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
    this.userForm.reset();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.usuarioService.emailValidator()]],
      nroDoc: ['', Validators.required, this.usuarioService.numeroDocumentoValidator()],
      telefono: ['', Validators.required],
      idRol: [null, Validators.required],
      username: ['', [Validators.required], this.usuarioService.usernameValidator()],
      password: ['', Validators.required]
    });
  }

  loadRoles(): void {
    this.usuarioService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  get formInvalido(): boolean {
    return this.userForm.invalid || this.userForm.pristine;
  }

  crearUsuario(): void {
    if (this.userForm.invalid) {
      return;
    }
    
    const userData = this.userForm.value;
    const selectedRol = this.roles.find(rol => rol.id === userData.idRol);
    userData.idRol = selectedRol;

    Swal.fire({
      title: '¿Deseas guardar el usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.postUsuario(userData).subscribe({
          next: () => {
            Swal.fire('¡Usuario creado!', 'El usuario ha sido creado exitosamente.', 'success').then(() => {
              Swal.fire({
                title: '¿Deseas agregar otro usuario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.userForm.reset();
                } else {
                  this.router.navigate(['listar-usuarios']);
                }
              });
            });
          },
          error: error => {
            console.error('Error al crear usuario:', error);
            Swal.fire('¡Error!', 'Ocurrió un error al crear el usuario. Por favor, intenta nuevamente.', 'error');
          }
        });
      }
    });
}

confirmarSalir(): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas salir del registro de usuario?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, salir'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/homeUser']); 
    }
  });
}

}
