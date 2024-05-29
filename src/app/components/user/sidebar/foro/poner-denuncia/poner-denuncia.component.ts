import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-poner-denuncia',
  templateUrl: './poner-denuncia.component.html',
  styleUrl: './poner-denuncia.component.css'
})
export class PonerDenunciaComponent {
  tipo: string = '';
  respuesta: string = '';
  body = {
    tipo: '',
    descripcion: '',
    referencia: ''
  }
  private id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PonerDenunciaComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.id = data.post_id;
  }

  denunciar() {
    if (!this.tipo.trim() || !this.respuesta.trim()) {
      console.log('No hay datos para añdir el post'); // LOG:
      this.errorService.openDialogError("Todos los campos deben estar rellenos.");
    } else {
      this.body = {
        tipo: this.tipo,
        descripcion: this.respuesta,
        referencia: this.id
      }
      this.backendService.postReports(this.body).subscribe(
        response => {
          this.tipo = this.respuesta = this.id = this.body.tipo = this.body.descripcion = this.body.referencia = '';
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }
}
