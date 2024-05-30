import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonerDenunciaComponent } from './poner-denuncia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../../shared/shared.module';

describe('PonerDenunciaComponent', () => {
  let component: PonerDenunciaComponent;
  let fixture: ComponentFixture<PonerDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PonerDenunciaComponent],
      imports: [ HttpClientTestingModule, SharedModule ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PonerDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
