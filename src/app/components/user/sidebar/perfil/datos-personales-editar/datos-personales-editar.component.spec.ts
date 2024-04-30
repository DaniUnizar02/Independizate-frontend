import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonalesEditarComponent } from './datos-personales-editar.component';

describe('DatosPersonalesEditarComponent', () => {
  let component: DatosPersonalesEditarComponent;
  let fixture: ComponentFixture<DatosPersonalesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosPersonalesEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosPersonalesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
