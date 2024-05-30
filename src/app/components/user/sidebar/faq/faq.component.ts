/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar las preguntas frecuentes.
 * 
 * Archivo: faq.component.ts 
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
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  preguntasFrecuentes: any[] = [];
  
  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) {}

  /**
   * La función `ngOnInit` ajusta el diseño según el ancho de la ventana.
   */
  ngOnInit(): void {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.backendService.getFaqs().subscribe(
      response => {
        this.preguntasFrecuentes = response.faqs
        console.log('FAQs: ', response.faqs); // LOG:
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron preguntas frecuentes.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  /**
   * Función que actualiza los datos del paginador.
   * @param event 
   */
  getPaginatorData(event: { pageIndex: number; }) {
    console.log(event);
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  // NOTE: RESPONSIVE

  rowHeightTit: string = '2:1'

  /**
   * Función que se ejecuta al redimensionar la ventana del navegador para ajustar el número de columnas y la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
