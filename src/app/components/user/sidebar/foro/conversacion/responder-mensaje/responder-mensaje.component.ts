/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de crear respuestas
 * para un mensaje.
 * 
 * Archivo: 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../../services/error/error.service';

@Component({
  selector: 'app-responder-mensaje',
  templateUrl: './responder-mensaje.component.html',
  styleUrl: './responder-mensaje.component.css'
})
export class ResponderMensajeComponent {
  mensaje: string = '';
  body = {
    autor: '',
    informacion: '',
  }

  private post_id: string;
  private message_id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ResponderMensajeComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.post_id = data.post_id;
    this.message_id = data.message_id;
  }

  /**
   * Función que añade una respuesta a un mensaje en el foro de conversación.
   */
  responder() {
    if (!this.mensaje.trim()) {
      this.errorService.openDialogError("Todos los campos deben estar rellenos.");
    } else {
      var cockie = this.backendService.getCookie();
      var dataCockie = '';
      if (cockie) {
        dataCockie = cockie.usuario;
      }
      this.body = {
        autor: dataCockie, // NOTE: Cambiar por el usuario correcto, este es por defecto
        informacion: this.mensaje, 
      }
      this.backendService.postMessagesPostIdMessageIdReply(this.post_id, this.message_id, this.body).subscribe(
        response => {
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 403) {
            this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
          } else if (error.status === 404) {
            this.errorService.openDialogError("Mensaje no encontrado.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }
}
