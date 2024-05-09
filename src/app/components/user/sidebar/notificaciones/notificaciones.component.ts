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
  // notificaciones = [
  //   { color: '', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
  // ];

  notificaciones: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit(): void {
    // this.backendService.getNotifications().subscribe(
    //   response => {
    //     // this.respuesta = response
    //     console.log('Notificaciones: ', response); // LOG:
    //   },
    //   error => {
    //     console.error('Error: ', error); // LOG:
    //     if (error.status === 401) {
    //       this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
    //     } else if (error.status === 403) {
    //       this.errorService.openDialogError("Acción no permitida.");
    //     } else if (error.status === 500) {
    //       this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
    //     }
    //   }
    // );
  }

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
