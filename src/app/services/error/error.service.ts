import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../components/error/error.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog, private router: Router) { }
  
  openDialogError(mensajeError: string, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
    const dialog = this.dialog.open(ErrorComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: mensajeError
    });
  }

  openDialogErrorRedirect(mensajeError: string, navigation: string, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
    const dialog = this.dialog.open(ErrorComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: mensajeError
    });

    dialog.afterClosed().subscribe(() => {
      this.router.navigate([navigation]);
    });
  }

  redirect(navigation: string) {
    this.router.navigate([navigation]);
  }
}
