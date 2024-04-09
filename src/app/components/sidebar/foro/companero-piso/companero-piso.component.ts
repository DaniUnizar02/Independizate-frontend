import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PonerDenunciaComponent } from '../poner-denuncia/poner-denuncia.component';
import { AnadirPostComponent } from '../anadir-post/anadir-post.component';

@Component({
  selector: 'app-companero-piso',
  templateUrl: './companero-piso.component.html',
  styleUrl: './companero-piso.component.css'
})
export class CompaneroPisoComponent {
  value: string = '';

  constructor(public dialog: MatDialog, private router: Router) {}

  navigateToConversacion() {
    this.router.navigate(['sidebar','foro','conversacion'])
  }

  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AnadirPostComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogDenuncia(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PonerDenunciaComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
