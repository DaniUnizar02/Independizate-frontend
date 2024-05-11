import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { VerNotificacionComponent } from './ver-notificacion/ver-notificacion.component';
import { MatDialog } from '@angular/material/dialog';
import { empty } from 'rxjs';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
  notificaciones: any[] = [];
  private notiLeidas: any[] = [];
  private notiNoLeidas: any[] = [];
  private respuesta: any[] = [];

  constructor(public dialog: MatDialog, private location: Location, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getNotificaciones();
  }

  private getNotificaciones() {
    this.notiLeidas = [];
    this.notiNoLeidas = [];
    this.backendService.getNotificationsAutorAutor(this.backendService.user).subscribe(
      response => {
        this.respuesta = response.respuesta.notificaciones
        console.log('Notificaciones: ', this.respuesta); // LOG:
        this.formatear();
        this.notificaciones = this.notiNoLeidas.concat(this.notiLeidas);
        console.log("Notis Leidas: ", this.notiLeidas); // LOG:
        console.log("Notis NO Leidas: ", this.notiNoLeidas); // LOG:
        console.log("Notis Todas: ", this.notificaciones); // LOG:
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

  private formatear(): void {
    for (const item of this.respuesta) {
      var data = {
        id: item._id,
        color: '',
        titulo: item.asunto.nombreForo,
        subtitulo: item.titulo,
        cuerpo: item.cuerpoNotificacion,
        idPost: item.asunto.idPost,
        idMensaje: item.asunto.idMensaje
      }
      if (item.leida) { data.color = '#3F3F4F' }

      if (item.asunto.nombreForo === "compagneroDePiso") { data.titulo = "Compañero de Piso" }
      else if (item.asunto.nombreForo === "recetas") { data.titulo = "Recetas" }
      else if (item.asunto.nombreForo === "economiaDomestica") { data.titulo = "Economía Doméstica" }
      else if (item.asunto.nombreForo === "limpieza") { data.titulo = "Limpieza" }
      else if (item.asunto.nombreForo === "otros") { data.titulo = "Otros" }

      console.log(data); // LOG:

      if (item.leida) { this.notiLeidas.push(data); }
      else { this.notiNoLeidas.push(data); }
    }
  }

  notificacionLeida(notificacion_id: string, notificacion_color: string): void {   
    console.log(notificacion_color)
    if (notificacion_color == '') {
      this.backendService.putNotificationsIdRead(notificacion_id).subscribe(
        response => { },
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

  openDialogVer(enterAnimationDuration: string, exitAnimationDuration: string, referencia: string): void {
    const dialog = this.dialog.open(VerNotificacionComponent, {
      width: '80%',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        notificacion: this.notificaciones.filter(item => item.id === referencia)
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getNotificaciones();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
