/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de gestionar la base para la visualización de notificaciones.
 * 
 * Archivo: ver-notificacion.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-notificacion',
  templateUrl: './ver-notificacion.component.html',
  styleUrl: './ver-notificacion.component.css'
})
export class VerNotificacionComponent {
  notificacion = {
    id: '',
    color: '',
    titulo: '',
    subtitulo: '',
    cuerpo: '',
    idPost: '',
    idMensaje: ''
  }

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<VerNotificacionComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.notificacion = data.notificacion[0];
    // console.log(data.notificacion); // LOG:
    // console.log(this.notificacion) // LOG:
  }

  notificacionNoLeida(notificacion_id: string, notificacion_color: string): void {   
    // console.log(notificacion_color);
    if (notificacion_color != '') {
      this.backendService.putNotificationsIdRead(notificacion_id).subscribe(
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
            this.errorService.openDialogError("No se han encontrado la notificación indicada.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }

  navigateToReferencia() {
    this.dialogRef.close();
    this.router.navigate(['sidebar','foro','conversacion', this.notificacion.idPost])
  }
}
