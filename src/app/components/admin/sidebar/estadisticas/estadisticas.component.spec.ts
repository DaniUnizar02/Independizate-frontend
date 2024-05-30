/**
 * Proyecto: Independizate
 * Descripción: Fichero de test para el componente estadisticas.
 * 
 * Archivo: estadisticas.component.spec.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasComponent } from './estadisticas.component';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

describe('EstadisticasComponent', () => {
  let component: EstadisticasComponent;
  let fixture: ComponentFixture<EstadisticasComponent>;
  let backendServiceStub: Partial<BackendService>;
  let errorServiceStub: Partial<ErrorService>;

  beforeEach(async () => {
    backendServiceStub = {
      getStatisticsAdmin: () => of({
        hora_punta: { '9:00': 10, '10:00': 20 }, // Mocked response
        busquedas: { 'Monday': 5, 'Tuesday': 10 },
        ciudades: { 'New York': 100, 'Los Angeles': 90 },
        inicios: { '2024-05-01': 50, '2024-05-02': 60 },
        registros: { '2024-05-01': 30, '2024-05-02': 40 }
      }),
      getStatisticsUser: () => of({
        estadisticas: {
          bestReputacion: [
            { usuario: 'User1', reputacion: 100 },
            { usuario: 'User2', reputacion: 90 },
            { usuario: 'User3', reputacion: 80 }
          ]
        }
      })
    };

    errorServiceStub = {
      redirect: () => {},
      openDialogErrorRedirect: () => {},
      openDialogError: () => {}
    };

    await TestBed.configureTestingModule({
      declarations: [EstadisticasComponent],
      providers: [
        { provide: BackendService, useValue: backendServiceStub },
        { provide: ErrorService, useValue: errorServiceStub }
      ],
      imports: [SharedModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(EstadisticasComponent);
    component = fixture.componentInstance;
    // No need to trigger ngOnInit, instead, perform necessary operations here
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debería situar las gráficas correctamente', () => {
    expect(component.horapunta).toBeDefined();
    expect(component.busquedas).toBeDefined();
    expect(component.ciudades).toBeDefined();
    expect(component.inicios).toBeDefined();
    expect(component.registros).toBeDefined();
  });
    
  it('Debería obtener las estadísticas del administrador', () => {

    // Asynchronous data fetching and processing is done in the constructor,
    // so the data should be available after component creation
    fixture.detectChanges();

    expect(component.horapunta.series[0].data).toEqual([10, 20]);
    expect(component.busquedas.series[0].data).toEqual([5, 10]);
    expect(component.ciudades.series[0].data).toEqual([100, 90]);
    expect(component.inicios.series[0].data).toEqual([50, 60]);
    expect(component.registros.series[0].data).toEqual([30, 40]);
  });
  
  it('debería obtener las estadísticas del usuario', () => {
    // Asynchronous data fetching and processing is done in the constructor,
    // so the data should be available after component creation
    fixture.detectChanges();

    expect(component.usuarios.series[0].data).toEqual([100, 90, 80]);
  });

  // Add more tests as needed
});