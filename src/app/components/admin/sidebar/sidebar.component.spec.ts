import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponentAdmin } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponentAdmin;
  let fixture: ComponentFixture<SidebarComponentAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponentAdmin]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponentAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
