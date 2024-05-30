import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WsComponent } from '../../components/ws/ws/ws.component';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private dialog: MatDialog) { }

  openDialogError(mensajeError: string, enterAnimationDuration: string = '0ms', exitAnimationDuration: string = '0ms'): void {
    const dialog = this.dialog.open(WsComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: mensajeError
    });
  }
}
