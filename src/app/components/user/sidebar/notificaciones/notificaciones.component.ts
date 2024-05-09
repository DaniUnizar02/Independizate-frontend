import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
  notificaciones: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.backendService.getNotifications().subscribe(
      response => {
        console.log('Notificaciones: ', response.respuesta.notificaciones); // LOG:
        // this.formatear(response.posts);
        // this.posts = this.todos;
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
  /**{
    "asunto": {
        "idForo": "0",
        "nombreForo": "Foro al que pertenece",
        "idMensaje": "0",
        "idSugerencia": "0"
    },
    "_id": "6630f9c9febf7ef164596b5c",
    "respuestaAdmin": true,
    "respuestaForo": true,
    "respuestaMensaje": true,
    "autor": "66179e368e2e7ed1c6989cbd"
} */

  formatear(): void {
    for (const item of this.respuesta) {
      var data = {
        color: '',
        titulo: '',
        subtitulo: '',
        cuerpo: ''
      }
      if (item.leida) { data.color = '#727294' }
      data.titulo = item.asunto.idForo // TODO: Cambiar el id del foro por el nombre del foro
      data.subtitulo = item.titulo
      data.cuerpo = item.cuerpoNotificacion

      console.log(data); // LOG:

      this.notificaciones.push(data);
    }
  }

  notificacionLeida(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
