import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
