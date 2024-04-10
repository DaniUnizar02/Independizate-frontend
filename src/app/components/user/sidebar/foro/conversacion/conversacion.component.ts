import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { AnadirConversacionComponent } from './anadir-conversacion/anadir-conversacion.component';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrl: './conversacion.component.css'
})
export class ConversacionComponent {
  constructor(public dialog: MatDialog) {}

  openDialogUsuario(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(VerUsuarioComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AnadirConversacionComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogResponder(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AnadirConversacionComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}



