import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
