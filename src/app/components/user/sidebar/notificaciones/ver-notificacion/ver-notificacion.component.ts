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
    console.log(data.notificacion); // LOG:
    console.log(this.notificacion) // LOG:
  }

  notificacionNoLeida(notificacion_id: string, notificacion_color: string): void {   
    console.log(notificacion_color);
    if (notificacion_color != '') {
      this.backendService.putNotificationsIdRead(notificacion_id).subscribe(
        response => {
        },
        error => {
          console.error('Error: ', error); // LOG:
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

  navigateToReferencia() {
    this.router.navigate(['sidebar','foro','conversacion', this.notificacion.idPost])
  }
}
