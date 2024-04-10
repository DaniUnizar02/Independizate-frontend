import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buscar-piso',
  templateUrl: './buscar-piso.component.html',
  styleUrl: './buscar-piso.component.css'
})
export class BuscarPisoComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
