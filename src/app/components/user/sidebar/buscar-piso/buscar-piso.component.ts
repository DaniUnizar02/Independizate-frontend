/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de la busqueda de pisos. 
 * 
 * Archivo: buscar-piso.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';

@Component({
  selector: 'app-buscar-piso',
  templateUrl: './buscar-piso.component.html',
  styleUrl: './buscar-piso.component.css'
})
export class BuscarPisoComponent {
  tarjetas: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];
  value: string = '';

  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    // NOTE: Responsive
    this.rowHeightBusc = (window.innerWidth <= 1200) ? '1:2' : '2:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.backendService.getAparments().subscribe(
      response => {
        this.respuesta = response.apartments
        // console.log('Pisos: ', response.apartments); // LOG:
        this.formatear();
        this.tarjetas = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 404) {
          this.errorService.openDialogError("No se han encontrado pisos.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * Función que formatea los datos de la respuesta de la API.
   */
  formatear(): void {
    for (const item of this.respuesta) {
      var data = {
        idIdealista: item.propertyCode,
        piso: item.suggestedTexts.title,
        direccion: item.address,
        descripcion: item.description,
        precio: item.price + "€",
        img: item.thumbnail,
        latitud: item.latitude,
        longitud: item.longitude,
      }

      this.todos.push(data);
    }
    this.todos = this.todos.reverse()
  }

  /**
   * Función que busca los pisos en función de la query introducida.
   */
  buscar(): void {
    if (!this.value.trim()) {
      console.log('No search query provided. Displaying all items.');
      this.tarjetas = this.todos;
    } else {
      console.log('Current tarjetas:', this.todos);
      console.log('Performing search with query:', this.value);
      this.value = this.value.toLowerCase();
      this.tarjetas = this.todos.filter(item =>
        item.piso.toLowerCase().includes(this.value) ||
        item.direccion.toLowerCase().includes(this.value) || 
        item.descripcion.toLowerCase().includes(this.value) ||
        item.precio.toString().toLowerCase().includes(this.value)
      );
      console.log('Filtered items:', this.tarjetas);
    }
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  // NOTE: RESPONSIVE

  rowHeightBusc: string = '2:1'
  rowHeightTit: string = '2:1'

  /**
   * La función `onResize` se ejecuta al redimensionar la ventana
   * del navegador para ajustar la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.rowHeightBusc = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }

  /**
   *  Fucnión auxiliar para testing
   *  Al no poder situar las tarjetas mockeadas en 'todos',
   *  se ha creado esta función para situar los datos de 'tarjetas' en 'todos'
   *  
   */
  devolverTodos() {
    this.todos = this.tarjetas;
  }
}
