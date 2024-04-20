import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePedidosMenuPostresComponent } from './home-pedidos-menu-postres.component';

describe('HomePedidosMenuPostresComponent', () => {
  let component: HomePedidosMenuPostresComponent;
  let fixture: ComponentFixture<HomePedidosMenuPostresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePedidosMenuPostresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePedidosMenuPostresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
