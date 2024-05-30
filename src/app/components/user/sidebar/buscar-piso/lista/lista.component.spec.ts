/**
 * Proyecto: Independizate
 * Descripción: Fichero de test para el componente lista.
 * 
 * Archivo: lista.component.spec.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListaComponent } from './lista.component';
import { BuscarPisoComponent } from '../buscar-piso.component';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { SharedModule } from '../../../../shared/shared.module';

describe('ListaComponent', () => {
  let component: ListaComponent;
  let fixture: ComponentFixture<ListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule 
      ],
      providers: [BuscarPisoComponent] // Provee una instancia de BuscarPisoComponent
    }).compileComponents();

    fixture = TestBed.createComponent(ListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
     
  it('Debería navegar a info-piso', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Espía el método navigate del router
    component.navigateToInfoPiso('someId');
    expect(routerSpy).toHaveBeenCalledWith(['sidebar', 'info-piso', 'someId']);
  });
   
  it('Debería actualizar los datos del paginador', () => {
    component.pageIndex = 0;
    component.lowValue = 0;
    component.highValue = 10;
    component.pageSize = 10;

    // Emula un cambio de página
    component.getPaginatorData({ pageIndex: 1 });

    expect(component.pageIndex).toBe(1);
    expect(component.lowValue).toBe(10);
    expect(component.highValue).toBe(20);

    // Emula un cambio de página hacia atrás
    component.getPaginatorData({ pageIndex: 0 });

    expect(component.pageIndex).toBe(0);
    expect(component.lowValue).toBe(0);
    expect(component.highValue).toBe(10);
  });

});
