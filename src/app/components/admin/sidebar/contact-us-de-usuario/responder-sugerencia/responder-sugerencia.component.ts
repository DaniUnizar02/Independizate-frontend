import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-responder-sugerencia',
  templateUrl: './responder-sugerencia.component.html',
  styleUrl: './responder-sugerencia.component.css'
})
export class ResponderSugerenciaComponent {
  mensaje: string = '';

  private id: string;
  info: string;
  tipo: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ResponderSugerenciaComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.id = data.id
    this.info = data.info;
    this.tipo = data.tipo;
  }

  responder() {
    if (!this.mensaje.trim()) {
      console.log('No hay datos para añdir el post'); // LOG:
      this.errorService.openDialogError("Todos los campos deben estar rellenos.");
    } else {
      var body = {
        respuesta: this.mensaje
      }
      this.backendService.putAdminSuggestionsAnswerId(this.id, body).subscribe(
        response => {
          this.dialogRef.close();
        },
        error => {
          console.error('Error: ', error);
          if (error.status === 401) {
            this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
          } else if (error.status === 403) {
            this.errorService.openDialogError("Forbidden.");
          } else if (error.status === 404) {
            this.errorService.openDialogError("No se encontraron posts.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }
}
