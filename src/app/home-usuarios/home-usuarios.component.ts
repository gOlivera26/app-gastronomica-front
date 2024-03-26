import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-usuarios',
  templateUrl: './home-usuarios.component.html',
  styleUrl: './home-usuarios.component.css'
})
export class HomeUsuariosComponent implements OnInit{

  isHomeComponent = true;

  constructor() {}

  ngOnInit(): void {
      this.isHomeComponent = true;
  }
}
