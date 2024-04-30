import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';

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

  constructor(private location: Location, private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getNotificacionesGeneral().subscribe(
      response => {
        // this.respuesta = response
        console.log('Notificaciones: ', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
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

      console.log(data); // LOG

      this.notificaciones.push(data);
    }
  }

  notificacionLeida(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
