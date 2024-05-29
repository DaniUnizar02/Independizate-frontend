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

  ngOnInit(): void {
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

  goBack(): void {
    this.location.back();
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

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
}
