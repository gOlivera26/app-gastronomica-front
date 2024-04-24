import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPedidoEnvioComponent } from './confirmar-pedido-envio.component';

describe('ConfirmarPedidoEnvioComponent', () => {
  let component: ConfirmarPedidoEnvioComponent;
  let fixture: ComponentFixture<ConfirmarPedidoEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarPedidoEnvioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmarPedidoEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
