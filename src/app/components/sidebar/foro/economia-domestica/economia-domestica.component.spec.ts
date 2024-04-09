import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiaDomesticaComponent } from './economia-domestica.component';

describe('EconomiaDomesticaComponent', () => {
  let component: EconomiaDomesticaComponent;
  let fixture: ComponentFixture<EconomiaDomesticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EconomiaDomesticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EconomiaDomesticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
