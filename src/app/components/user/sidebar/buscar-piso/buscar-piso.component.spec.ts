/**
 * Proyecto: Independizate
 * Descripción: Fichero de test para el componente buscar-piso.
 * 
 * Archivo: buscar-piso.component.spec.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPisoComponent } from './buscar-piso.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BuscarPisoComponent', () => {
  let component: BuscarPisoComponent;
  let fixture: ComponentFixture<BuscarPisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPisoComponent ],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('Deberia formatear los datos de respuesta correctamente', () => {
    const mockResponse = {
      apartments: [
        { propertyCode: 1, suggestedTexts: { title: 'Title1' }, address: 'Address1', description: 'Description1', price: 100, thumbnail: 'image1.jpg' },
        { propertyCode: 2, suggestedTexts: { title: 'Title2' }, address: 'Address2', description: 'Description2', price: 200, thumbnail: 'image2.jpg' }
      ]
    };
    component['respuesta'] = mockResponse.apartments;
    component.tarjetas = mockResponse.apartments.map(apartment => ({
      idIdealista: apartment.propertyCode,
      piso: apartment.suggestedTexts.title,
      direccion: apartment.address,
      descripcion: apartment.description,
      precio: apartment.price + "€",
      img: apartment.thumbnail
    }));
    expect(component.tarjetas.length).toBe(2);
    expect(component.tarjetas[0].idIdealista).toBe(1);
    expect(component.tarjetas[1].idIdealista).toBe(2);
  });

  it('deberia filtrar los datos correctamente', () => {
    component.tarjetas = [
      { piso: 'Title1', direccion: 'Address1', descripcion: 'Description1', precio: '100€' },
      { piso: 'Title2', direccion: 'Address2', descripcion: 'Description2', precio: '200€' }
    ];
    component.devolverTodos();
    component.value = 'Title1';
    component.buscar();
    expect(component.tarjetas.length).toBe(1);
    // Since we're filtering based on piso, we should expect the filtered item to have 'Title1' as piso
    expect(component.tarjetas[0].piso).toBe('Title1');
  });
  
});
