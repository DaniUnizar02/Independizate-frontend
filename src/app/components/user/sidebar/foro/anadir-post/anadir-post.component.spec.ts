import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPostComponent } from './anadir-post.component';

describe('AnadirPostComponent', () => {
  let component: AnadirPostComponent;
  let fixture: ComponentFixture<AnadirPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnadirPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnadirPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
