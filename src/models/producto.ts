export interface Producto{
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    cantidad: number;
    tipoProducto: TipoProducto;
    novedad: boolean;
}

export interface TipoProducto{
    id: number;
    nombre: string;
}

export interface ProductoSeleccionado{
    producto: Producto;
    cantidad: number;   
}