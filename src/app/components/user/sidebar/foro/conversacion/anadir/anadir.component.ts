/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de añadir una nueva conversación.
 * 
 * Archivo: anadir-conversacion.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from '../../../../../../services/error/error.service';
import { BackendService } from '../../../../../../services/backend/backend.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrl: './anadir.component.css'
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

  /**
   * Función que añade un post al foro de conversación.
   */
  anadir() {
    if (!this.mensaje.trim()) {
      console.log('No hay datos para añdir el post'); // LOG:
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
        fechaPublicacion: '2024-05-09T16:00:50.260Z' // NOTE: La fecha de publicación la auto calcula el backend, no?
      }
      this.backendService.postMessagesPostId(this.post_id, this.body).subscribe(
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
