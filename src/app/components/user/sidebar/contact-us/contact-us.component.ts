import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  tipo = '';
  descripcion = '';
  body = {
    autor: '',
    tipo: '',
    descripcion: ''
  }


  constructor(private location: Location, private backendService: BackendService) {}

  goBack(): void {
    this.location.back();
  }

  enviarFormulario(): void {
    this.body = {
      autor: this.backendService.user,
      tipo: this.tipo,
      descripcion: this.descripcion
    }

    console.log(this.body); // DELETE:

    this.backendService.postContactUs(this.body).subscribe(
      response => {
        console.log('Sugerencia creada correctamente: ', response);
      },
      error => {
        console.error('Error al crear la sugerencia: ', error);
      }
    );
  }
}
