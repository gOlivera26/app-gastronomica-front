export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    username: string;
    nroDoc: string;
    email: string;
    telefono: string;
    password: string;
    activo: boolean;
    verificationCode: string;
    rol: Rol; 
    imagenProfile: string; 
  }
  
  export interface Rol {
    id: number;
    descripcion: string;
  }

  export interface updateUsuarioRequest{
    id: number; 
    nombre: string;
    apellido: string;
    nroDoc: string;
    email: string;
    telefono: string;
    idRol: Rol;
  }
  