import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { AnadirConversacionComponent } from './anadir-conversacion/anadir-conversacion.component';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrl: './conversacion.component.css'
})
export class ConversacionComponent {
  mensajes: any[] = [];

  constructor(public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { 
    this.backendService.getPostsIdMessages(this.backendService.user).subscribe(
      response => {
        
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Forbidden.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

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



