import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotificacionComponent } from './ver-notificacion.component';

describe('VerNotificacionComponent', () => {
  let component: VerNotificacionComponent;
  let fixture: ComponentFixture<VerNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerNotificacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
