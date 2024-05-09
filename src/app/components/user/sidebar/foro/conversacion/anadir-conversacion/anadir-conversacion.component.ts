import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from '../../../../../../services/error/error.service';
import { BackendService } from '../../../../../../services/backend/backend.service';

@Component({
  selector: 'app-anadir-conversacion',
  templateUrl: './anadir-conversacion.component.html',
  styleUrl: './anadir-conversacion.component.css'
})
export class AnadirConversacionComponent {
  mensaje: string = '';
  body = {
    autor: '',
    informacion: '',
    fechaPublicacion: '' 
  }

  private post_id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AnadirConversacionComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.post_id = data.post_id;
  }

  anadir() {
    if (!this.mensaje.trim()) {
      console.log('No hay datos para añdir el post'); // LOG:
      this.errorService.openDialogError("Todos los campos deben estar rellenos.");
    } else {
      this.body = {
        autor: this.backendService.user, // NOTE: Cambiar por el usuario correcto, este es por defecto
        informacion: this.mensaje, 
        fechaPublicacion: '2024-05-09T16:00:50.260Z' // NOTE: La fecha de publicación la auto calcula el backend, no?
      }
      this.backendService.postMessagesPostId(this.post_id, this.body).subscribe(
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
