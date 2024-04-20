import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePedidosMenuComplementosComponent } from './home-pedidos-menu-complementos.component';

describe('HomePedidosMenuComplementosComponent', () => {
  let component: HomePedidosMenuComplementosComponent;
  let fixture: ComponentFixture<HomePedidosMenuComplementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePedidosMenuComplementosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePedidosMenuComplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
