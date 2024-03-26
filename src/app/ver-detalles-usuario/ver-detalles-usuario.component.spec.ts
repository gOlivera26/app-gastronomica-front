import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesUsuarioComponent } from './ver-detalles-usuario.component';

describe('VerDetallesUsuarioComponent', () => {
  let component: VerDetallesUsuarioComponent;
  let fixture: ComponentFixture<VerDetallesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetallesUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerDetallesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
