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
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos.");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 403) {
            this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
          } else if (error.status === 404) {
            this.errorService.openDialogError("No se ha encontrado la sugerencia/queja indicada.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }
}
