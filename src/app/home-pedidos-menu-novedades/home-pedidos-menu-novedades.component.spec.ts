import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePedidosMenuNovedadesComponent } from './home-pedidos-menu-novedades.component';

describe('HomePedidosMenuNovedadesComponent', () => {
  let component: HomePedidosMenuNovedadesComponent;
  let fixture: ComponentFixture<HomePedidosMenuNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePedidosMenuNovedadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePedidosMenuNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
