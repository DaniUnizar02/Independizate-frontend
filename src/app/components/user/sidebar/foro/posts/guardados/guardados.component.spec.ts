import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadosComponent } from './guardados.component';

describe('GuardadosComponent', () => {
  let component: GuardadosComponent;
  let fixture: ComponentFixture<GuardadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
