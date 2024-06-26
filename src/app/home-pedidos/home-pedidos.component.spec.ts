import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePedidosComponent } from './home-pedidos.component';

describe('HomePedidosComponent', () => {
  let component: HomePedidosComponent;
  let fixture: ComponentFixture<HomePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
