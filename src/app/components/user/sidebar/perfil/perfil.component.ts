import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { BackendService } from '../../../../services/backend/backend.service';

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

  constructor(private backendService: BackendService, private location: Location, private router: Router) {
    if (this.backendService.cookie.esInvitado) {
      router.navigate(['/']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
