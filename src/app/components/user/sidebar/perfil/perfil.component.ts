import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  navLinks = [
    { path: "info", label: "Datos personales" },
    { path: "estadisticas", label: "Estadísticas" },
  ];

  constructor(private location: Location, private router: Router) { }

  goBack(): void {
    this.location.back();
  }
}
