import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home.pedidos-menu',
  templateUrl: './home.pedidos-menu.component.html',
  styleUrls: ['./home.pedidos-menu.component.css']
})
export class HomePedidosMenuComponent {

  constructor(private router: Router) { }

  navegar(ruta: string): void {
    this.router.navigateByUrl(ruta);
  }
}
