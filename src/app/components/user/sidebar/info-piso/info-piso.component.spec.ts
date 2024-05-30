import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPisoComponent } from './info-piso.component';

describe('InfoPisoComponent', () => {
  let component: InfoPisoComponent;
  let fixture: ComponentFixture<InfoPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
