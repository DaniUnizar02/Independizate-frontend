import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
