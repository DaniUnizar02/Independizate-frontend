import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../../services/error/error.service';
import { VerNotificacionComponent } from '../../../notificaciones/ver-notificacion/ver-notificacion.component';

@Component({
  selector: 'app-estampas',
  templateUrl: './estampas.component.html',
  styleUrl: './estampas.component.css'
})
export class EstampasComponent {
  private user: string;
  estampa1: string;
  estampa2: string;
  estampa3: string;
  estampaNueva: string;
  seleccionada: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<VerNotificacionComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.user = data.user;
    this.estampa1 = data.estampa1;
    this.estampa2 = data.estampa2;
    this.estampa3 = data.estampa3;
    this.estampaNueva = data.estampaNueva;
    // console.log(data.notificacion); // LOG:
    // console.log(this.notificacion) // LOG:
  }

  cambiarEstampa() {
    if(this.seleccionada.trim()) {
      this.estampa1 = (this.seleccionada=='1') ? this.estampaNueva : this.estampa1;
      this.estampa2 = (this.seleccionada=='2') ? this.estampaNueva : this.estampa2;
      this.estampa3 = (this.seleccionada=='3') ? this.estampaNueva : this.estampa3;
      var body = {
        estampasFavoritas: [
          this.estampa1,
          this.estampa2,
          this.estampa3
        ]
      }

      this.backendService.putProfilesIdStampsFavs(this.user, body).subscribe(
        response => {
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos.");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 403) {
            this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
          } else if (error.status === 404) {
            this.errorService.openDialogError("No se han encontrado la notificación indicada.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }
}
