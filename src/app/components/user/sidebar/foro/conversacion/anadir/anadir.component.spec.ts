import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirConversacionComponent } from './anadir.component';

describe('AnadirConversacionComponent', () => {
  let component: AnadirConversacionComponent;
  let fixture: ComponentFixture<AnadirConversacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnadirConversacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnadirConversacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
