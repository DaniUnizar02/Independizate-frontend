import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsDeUsuarioComponent } from './contact-us.component';

describe('ContactUsDeUsuarioComponent', () => {
  let component: ContactUsDeUsuarioComponent;
  let fixture: ComponentFixture<ContactUsDeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsDeUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactUsDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
