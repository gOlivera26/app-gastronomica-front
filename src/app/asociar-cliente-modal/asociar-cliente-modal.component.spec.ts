import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarClienteModalComponent } from './asociar-cliente-modal.component';

describe('AsociarClienteModalComponent', () => {
  let component: AsociarClienteModalComponent;
  let fixture: ComponentFixture<AsociarClienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsociarClienteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsociarClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
