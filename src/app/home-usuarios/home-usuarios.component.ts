import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-usuarios',
  templateUrl: './home-usuarios.component.html',
  styleUrls: ['./home-usuarios.component.css'],
})
export class HomeUsuariosComponent implements AfterViewInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  managements: string[] = ['Usuarios', 'Clientes']; 

  currentManagement: string = 'Usuarios';
  listLink: string = '/listar-usuarios';
  addLink: string = '/agregar-usuario';

  descriptions: { [key: string]: { list: string; listDetails: string; add: string; addDetails: string; extras?: string; }; } = {
    'Usuarios': {
      list: 'Listado de Usuarios',
      listDetails: 'Visualizar y administrar usuarios',
      add: 'Agregar Usuario',
      addDetails: 'Agregar nuevos usuarios',
      extras: 'Gestiona roles y permisos',
    },
    'Clientes': { 
      list: 'Listado de Clientes',
      listDetails: 'Visualizar y administrar clientes',
      add: 'Agregar Cliente',
      addDetails: 'Agregar nuevos clientes',
      extras: 'Realiza otras operaciones específicas para clientes',
    }
  };

  enterAnimation: boolean = false;
  leaveAnimation: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.initOverlayEffect();
  }

  private initOverlayEffect(): void {
    const cards = this.cardsContainer.nativeElement.querySelectorAll('.card');

    if (!this.cardsContainer.nativeElement || !this.overlay.nativeElement) {
      console.error("No se pudo encontrar el contenedor de las cards o el overlay.");
      return;
    }

    const applyOverlayMask = (e: MouseEvent) => {
      const overlayEl = this.overlay.nativeElement as HTMLElement;
      const x = e.pageX - this.cardsContainer.nativeElement.offsetLeft;
      const y = e.pageY - this.cardsContainer.nativeElement.offsetTop;

      overlayEl.style.setProperty('--opacity', '1');
      overlayEl.style.setProperty('--x', `${x}px`);
      overlayEl.style.setProperty('--y', `${y}px`);
    };

    document.body.addEventListener("pointermove", applyOverlayMask);
  }
  
  onPageChange(event: PageEvent): void {
    this.enterAnimation = false;
    this.leaveAnimation = false;
  
    setTimeout(() => {
      if (event.previousPageIndex! < event.pageIndex) {
        this.enterAnimation = true;
      } else {
        this.leaveAnimation = true;
      }
  
      this.currentManagement = this.managements[event.pageIndex];
      if (this.currentManagement === 'Usuarios') {
        this.listLink = '/listar-usuarios';
        this.addLink = '/agregar-usuario';
      } else if (this.currentManagement === 'Clientes') {
        this.listLink = '/listar-clientes';
        this.addLink = '#agregar-cliente';
      }
      
      const activeCard = this.cardsContainer.nativeElement.querySelector('.cards__card:nth-child(' + (event.pageIndex + 1) + ')');
      if (activeCard) {
        const containerWidth = this.cardsContainer.nativeElement.offsetWidth;
        const cardWidth = activeCard.offsetWidth;
        const cardLeftOffset = activeCard.offsetLeft;
        const scrollLeft = Math.max(cardLeftOffset - (containerWidth - cardWidth) / 2, 0);
        this.cardsContainer.nativeElement.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
  
      setTimeout(() => {  
        this.leaveAnimation = false;
      }, 300); 
    }, 50);
  }
  
}
