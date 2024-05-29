/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de manejar la información de un piso.
 * 
 * Archivo: info-piso.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-piso',
  templateUrl: './info-piso.component.html',
  styleUrl: './info-piso.component.css'
})
export class InfoPisoComponent {
  id: string = '';
  respuesta = {
    idIdealista: '',
    nombre: '',
    direccion: '',
    habitaciones: '',
    tamano: '',
    descripcion: '',
    precio: '',
    img: '',
    url: ''
  };

  constructor(private route: ActivatedRoute, private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = idParam;
    } else {
      // Manejar el caso cuando el id es null
      console.error('El parámetro id no está presente en la ruta.');
    }
  }

  ngOnInit() {
    this.backendService.getApartmentsId(this.id).subscribe(
      response => {
        this.respuesta = {
          idIdealista: response.propertyCode,
          nombre: response.suggestedTexts.title,
          direccion: response.address,
          habitaciones: response.room + " habitaciones",
          tamano: response.size + " m2",
          descripcion: response.description,
          precio: response.price + "€",
          img: response.thumbnail,
          url: response.url
        }
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Piso no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  // NOTE: Conversación

  navigateToIdealista(url: string) {
    window.location.href = url;
  }

  goBack(): void {
    this.location.back();
  }
}
