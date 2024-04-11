import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    this.location.back();
  }

  cambiarRoute(event: MatTabChangeEvent) {
    var ruta = event.tab.textLabel.toLowerCase().replace(' ', '-');
    if (ruta=="datos-personales") {
      ruta = "info";
    } else if (ruta=="estadísticas") {
      ruta = "estadisticas";
    }
    console.log(ruta);
    this.router.navigate(['sidebar','perfil', ruta])
  }
}
