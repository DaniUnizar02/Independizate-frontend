import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaneroPisoComponent } from './companero-piso.component';

describe('CompaneroPisoComponent', () => {
  let component: CompaneroPisoComponent;
  let fixture: ComponentFixture<CompaneroPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompaneroPisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaneroPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
