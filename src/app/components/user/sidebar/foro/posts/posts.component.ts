import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  navLinks = [
    { path: "piso", label: "Compañero de piso" },
    { path: 'recetas', label: "Recetas" },
    { path: 'economia', label: "Economía doméstica" },
    { path: 'limpieza', label: "Limpieza" },
    { path: 'otros', label: "Otros" },
    { path: 'guardados', label: "Guardados" }
  ];

  constructor() { }
}
