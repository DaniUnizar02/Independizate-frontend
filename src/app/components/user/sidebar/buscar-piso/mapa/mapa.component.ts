import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiltrosComponent } from '../filtros/filtros.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  value: string = '';

  constructor(public dialog: MatDialog) {}

  openDialogFilter(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FiltrosComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
