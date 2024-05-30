/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar el perfil de usuario.
 * 
 * Archivo: perfil.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
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
    var cockie=this.backendService.getCookie();
    var data = false;
    if (cockie) {
      data = cockie.esInvitado;
    }

    if (data) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }

  goBack(): void {
    this.location.back();
  }

  // NOTE: RESPONSIVE
  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
