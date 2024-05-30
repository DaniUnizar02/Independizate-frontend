import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderMensajeComponent } from './responder-mensaje.component';

describe('ResponderMensajeComponent', () => {
  let component: ResponderMensajeComponent;
  let fixture: ComponentFixture<ResponderMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponderMensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponderMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
