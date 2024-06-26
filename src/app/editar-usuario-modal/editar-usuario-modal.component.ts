import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VerDetallesUsuarioComponent } from '../ver-detalles-usuario/ver-detalles-usuario.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol, Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario-modal',
  templateUrl: './editar-usuario-modal.component.html',
  styleUrl: './editar-usuario-modal.component.css'
})
export class EditarUsuarioModalComponent implements OnInit {
  userDetailsForm: FormGroup;
  isEditMode: boolean = false;
  roles: Rol[] = [];
  usuarioId!: number;
  formInvalido: boolean = false;

  constructor(public dialogRef: MatDialogRef<VerDetallesUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService) {
    this.userDetailsForm = this.formBuilder.group({
      nombre: [{value: '', disabled: true}, Validators.required],
      apellido: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      nroDoc: [{value: '', disabled: true}, Validators.required],
      telefono: [{value: '', disabled: true}, Validators.required],
      rol: [{value: '', disabled: true}, Validators.required] 
    });

    this.usuarioService.getRoles().subscribe({
      next: (roles: Rol[]) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error al obtener los roles:', error);
      }
    });

    this.usuarioService.getUserProfile(data.username).subscribe({
      next: ({ id, usuario }: { id: number, usuario: Usuario }) => {
        console.log('ID del usuario:', id);
        this.usuarioId = id;
        this.userDetailsForm.patchValue(usuario);
        this.userDetailsForm.get('rol')?.setValue(usuario.rol.id);
        this.userDetailsForm.get('id')?.setValue(id);
        usuario.id = id;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    });
  }

  ngOnInit(): void {
    this.userDetailsForm.statusChanges.subscribe(() => {
      this.formInvalido = this.userDetailsForm.invalid;
    });
    
  }
  onClose(): void {
    this.dialogRef.close();
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.userDetailsForm.enable();
    } else {
      this.userDetailsForm.disable();
    }
  }

  onSaveChanges(): void {
    Swal.fire({
      title: '¿Guardar cambios?',
      text: '¿Estás seguro de que deseas guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarCambios();
      }
    });
  }

  guardarCambios(): void {
  
    const usuarioFormValues = this.userDetailsForm.value;
    const usuario = {
      id: this.usuarioId,
      nombre: usuarioFormValues.nombre,
      apellido: usuarioFormValues.apellido,
      email: usuarioFormValues.email,
      nroDoc: usuarioFormValues.nroDoc,
      telefono: usuarioFormValues.telefono,
      idRol: { id: usuarioFormValues.rol, descripcion: '' },
      activo: true
    };
  
    console.log('Usuario a enviar:', usuario);
    if (this.usuarioId !== undefined) {
      this.usuarioService.updateUsuario(usuario).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Cambios guardados!',
            showConfirmButton: false,
            timer: 1500
          });
          this.toggleEditMode();
        },
        error: (error) => {
          console.error('Error al guardar los cambios:', error);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un error al intentar guardar los cambios. Por favor, inténtalo de nuevo más tarde.'
          });
        }
      });
    } else {
      console.error('No se puede guardar los cambios: ID de usuario indefinido');
    }
  }
}
