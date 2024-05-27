import { Component } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  navLinks = [{path: '', label: ''}];

  constructor(private backendService: BackendService) {
    if (backendService.cookie.esInvitado) {
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
