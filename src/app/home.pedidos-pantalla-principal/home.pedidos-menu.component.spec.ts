import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePedidosMenuComponent } from './home.pedidos-menu.component';

describe('HomePedidosMenuComponent', () => {
  let component: HomePedidosMenuComponent;
  let fixture: ComponentFixture<HomePedidosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePedidosMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePedidosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
