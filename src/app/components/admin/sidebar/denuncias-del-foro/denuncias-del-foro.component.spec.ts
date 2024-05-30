/**
 * Proyecto: Independizate
 * Descripción: Fichero de test para el componente denuncias-del-foro.
 * 
 * Archivo: denuncias-del-foro.component.spec.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { MasDetallesComponent } from './mas-detalles/mas-detalles.component';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { SharedModule } from '../../../shared/shared.module';

import { DenunciasDelForoComponent } from './denuncias-del-foro.component';

describe('DenunciasDelForoComponent', () => {
  let component: DenunciasDelForoComponent;
  let fixture: ComponentFixture<DenunciasDelForoComponent>;

  // Mock del BackendService
  const backendServiceMock = {
    cookie: { token: 'mockedToken' },
    getAdminReports: () => of({ reports: [] }),
    putApiAdminReportRejectId: () => of({})
  };

  // Mock del ErrorService
  const errorServiceMock = {
    redirect: () => {},
    openDialogErrorRedirect: () => {},
    openDialogError: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciasDelForoComponent, MasDetallesComponent],
      imports: [MatDialogModule, MatGridListModule, SharedModule],
      providers: [
        { provide: BackendService, useValue: backendServiceMock },
        { provide: ErrorService, useValue: errorServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DenunciasDelForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
     
  it('Debería obtener las denuncias', () => {
    spyOn(component, 'getDenuncias');
    component.ngOnInit();
    expect(component.getDenuncias).toHaveBeenCalled();
  });
  
  it('Debería actualizar el paginator', () => {
    const event = { pageIndex: 1 };
    component.getPaginatorData(event);
    expect(component.lowValue).toEqual(10);
    expect(component.highValue).toEqual(20);
    expect(component.pageIndex).toEqual(1);
  });
   
  it('Debería reformatear los datos de las denuncias', () => {
    const response = {
      reports: [
        {
          _id: '1',
          tipo: 'tipo1',
          profilePhoto: 'photo1.jpg',
          username: 'user1',
          descripcion: 'desc1',
          referencia: 'ref1',
          autor: 'autor1',
          respuesta: 'respuesta1'
        },
        {
          _id: '2',
          tipo: 'tipo2',
          profilePhoto: 'photo2.jpg',
          username: 'user2',
          descripcion: 'desc2',
          referencia: 'ref2',
          autor: 'autor2',
          respuesta: 'respuesta2'
        }
      ]
    };
  
    component.putRespuesta(response.reports);
    component.formatear();
    const todos = component.getTodos();
    console.log("Test todos: ",todos);
    expect(todos.length).toEqual(2);
    expect(todos[0].id).toEqual('2');
    expect(todos[0].tipo).toEqual('tipo2');
    // More expectations for other properties
  });
  

  // Add more tests for other methods and scenarios as needed
});
