import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaComponent } from './limpieza.component';

describe('LimpiezaComponent', () => {
  let component: LimpiezaComponent;
  let fixture: ComponentFixture<LimpiezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LimpiezaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
