import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeUsuariosComponent } from './gestion-de-usuarios.component';

describe('GestionDeUsuariosComponent', () => {
  let component: GestionDeUsuariosComponent;
  let fixture: ComponentFixture<GestionDeUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDeUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDeUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
