import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  tipo = '';
  titulo = '';
  descripcion = '';
  body = {
    autor: '',
    tipo: '',
    titulo: '',
    descripcion: ''
  }


  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) {}

  goBack(): void {
    this.location.back();
  }

  enviarFormulario(): void {
    this.body = {
      autor: this.backendService.user,
      tipo: this.tipo,
      titulo: this.titulo,
      descripcion: this.descripcion
    }

    console.log(this.body); // DELETE:

    this.backendService.postContactUs(this.body).subscribe(
      response => {
        console.log('Sugerencia creada correctamente: ', response); // LOG:
        this.tipo = this.descripcion = '';
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
        } else if (error.status === 401) {
          // this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
          this.errorService.openDialogError("No se ha podido crear tu " + this.tipo.toLowerCase() + ", intentalo de nuevo más tarde");
        }
      }
    );
  }
}
