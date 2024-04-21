import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasDelForoComponent } from './denuncias-del-foro.component';

describe('DenunciasDelForoComponent', () => {
  let component: DenunciasDelForoComponent;
  let fixture: ComponentFixture<DenunciasDelForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciasDelForoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenunciasDelForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
