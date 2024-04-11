import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
  notificaciones = [
    { color: '', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '#727294', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '#727294', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '#727294', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '#727294', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '#727294', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' },
    { color: '#727294', titulo: 'Foro al que pertenece', subtitulo: 'TITULO DE NOTIFICACIÓN', cuerpo: 'Cuerpo de la notificación' }
  ];

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
