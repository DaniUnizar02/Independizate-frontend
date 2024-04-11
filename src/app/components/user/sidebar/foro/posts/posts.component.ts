import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnadirPostComponent } from '../anadir-post/anadir-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  value: string = '';

  navLinks = [
    { path: "piso", label: "Compañero de piso" },
    { path: 'recetas', label: "Recetas" },
    { path: 'economia', label: "Economía doméstica" },
    { path: 'limpieza', label: "Limpieza" },
    { path: 'otros', label: "Otros" },
    { path: 'guardados', label: "Guardados" }
  ];

  constructor(public dialog: MatDialog) {}

  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AnadirPostComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
