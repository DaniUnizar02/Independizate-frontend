/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de obtener y mostrar los datos
 * dentro de los mensajes del foro.
 * 
 * Archivo: posts.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  navLinks = [{ path: '', label: '' }];

  constructor(private backendService: BackendService) {
    var cockie = this.backendService.getCookie();
    var dataCockie = false;
    if (cockie) {
      dataCockie = cockie.esInvitado;
    }

    if (dataCockie) {
      this.navLinks = [
        { path: "piso", label: "Compañero de piso" },
        { path: 'recetas', label: "Recetas" },
        { path: 'economia', label: "Economía doméstica" },
        { path: 'limpieza', label: "Limpieza" },
        { path: 'otros', label: "Otros" }
      ];
    } else {
      this.navLinks = [
        { path: "piso", label: "Compañero de piso" },
        { path: 'recetas', label: "Recetas" },
        { path: 'economia', label: "Economía doméstica" },
        { path: 'limpieza', label: "Limpieza" },
        { path: 'otros', label: "Otros" },
        { path: 'guardados', label: "Guardados" }
      ];
    }
  }
}
