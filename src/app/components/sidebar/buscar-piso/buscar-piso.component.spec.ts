import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPisoComponent } from './buscar-piso.component';

describe('BuscarPisoComponent', () => {
  let component: BuscarPisoComponent;
  let fixture: ComponentFixture<BuscarPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarPisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
