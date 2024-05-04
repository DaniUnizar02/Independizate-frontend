import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../components/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog) { }
  openDialogError(mensajeError: string, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
    const dialog = this.dialog.open(ErrorComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: mensajeError
    });

    dialog.afterClosed().subscribe(() => {
      // Llama a la función que deseas ejecutar cuando el modal se cierre
    });
  }
}
