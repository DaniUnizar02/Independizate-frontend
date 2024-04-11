import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrl: './guardados.component.css'
})
export class GuardadosComponent {
  value: string = '';

  constructor(private router: Router) {}

  cambiarRoute(event: MatTabChangeEvent) {
    var ruta = event.tab.textLabel.toLowerCase().replace(' ', '-');
    console.log(ruta);
    if (ruta=="compañero-de piso") {
      ruta = "piso";
    } else if (ruta=="economía-doméstica") {
      ruta = "economia";
    }
    console.log(ruta);
    this.router.navigate(['sidebar','foro', ruta])
  } 
}
