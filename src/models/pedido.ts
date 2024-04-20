export interface Pedido {
    id: number;
    idCliente: number;
    fechaPedido: string; // Cambiar el tipo de fecha según corresponda
    direccionEntrega: string;
    observacion: string;
    detallePedido: DetallePedido[];
    estado: string;
    total: number;
}

export interface DetallePedido {
    idProducto: number;
    cantidad: number;
}

export interface PedidoResponse {
    idPedido: number;
    idCliente: number;
    nombre: string;
    apellido: string;
    nroDoc: string;
    fechaPedido: string; 
    direccionEntrega: string;
    estado: string;
    observacion: string;
    total: number;
    detallePedido: DetallePedidoResponse[];
}

export interface DetallePedidoResponse {
    idProducto: number;
    producto: string;
    precioProducto: number;
    cantidad: number;
    subtotal: number;
}