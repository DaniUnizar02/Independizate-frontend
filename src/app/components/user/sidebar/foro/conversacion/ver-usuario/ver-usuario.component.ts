import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../../services/error/error.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrl: './ver-usuario.component.css'
})
export class VerUsuarioComponent {
  usuario = {
    fotoPerfil: '',
    usuario: '',
    reputacion: '',
    estampasFavoritas: []
  }

  private autor: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<VerUsuarioComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.autor = data.autor;
  } 

  ngOnInit() {
    this.backendService.getUsersIdBasic(this.autor).subscribe(
      response => {
        this.usuario = {
          fotoPerfil: response.users.fotoPerfil,
          usuario: response.users.usuario,
          reputacion: response.users.reputacion,
          estampasFavoritas: response.users.estampasFavoritas
        }
      },
      error => {
        console.error('Error: ', error);
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
}
