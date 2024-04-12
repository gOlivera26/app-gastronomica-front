import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePedidosMenuHamburguesasComponent } from './home-pedidos-menu-hamburguesas.component';

describe('HomePedidosMenuHamburguesasComponent', () => {
  let component: HomePedidosMenuHamburguesasComponent;
  let fixture: ComponentFixture<HomePedidosMenuHamburguesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePedidosMenuHamburguesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePedidosMenuHamburguesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
