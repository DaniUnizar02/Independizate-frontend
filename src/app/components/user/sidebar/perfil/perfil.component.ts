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

  /**
  * La función ngOnInit ajusta el diseño según el tamaño de la ventana para mejorar la capacidad de
  * respuesta.
  */
  ngOnInit() {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  // NOTE: RESPONSIVE
  rowHeightTit: string = '2:1'

    /**
   * La función `onResize` ajusta el número de columnas y alturas de filas según el ancho de la
   * ventana.
   * @param {any} event - El parámetro `event` en la función `onResize` es un objeto que representa el
   * evento desencadenado cuando se cambia el tamaño de la ventana. Contiene información sobre el
   * evento, como el elemento de destino (en este caso, la ventana), que se puede usar para acceder a
   * propiedades como `innerWidth` para determinar
   */
  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
