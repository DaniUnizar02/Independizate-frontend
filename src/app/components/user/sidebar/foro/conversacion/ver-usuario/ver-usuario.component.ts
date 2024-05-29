/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar la información
 * de un usuario ajeno.
 * 
 * Archivo: ver-usuario.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
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
    estampaFavorita1: '',
    estampaFavorita2: '',
    estampaFavorita3: ''
  }

  private autor: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<VerUsuarioComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.autor = data.autor;
  } 

  ngOnInit() {
    this.backendService.getUsersIdBasic(this.autor).subscribe(
      response => {
        console.log("RESPONSE: ", response.users) // LOG:
        this.usuario = {
          fotoPerfil: response.users.fotoPerfil,
          usuario: response.users.usuario,
          reputacion: response.users.reputacion,
          estampaFavorita1: '',
          estampaFavorita2: '',
          estampaFavorita3: '',
        }
        this.usuario.estampaFavorita1 = (response.users.Stamps[0].foto===undefined) ? '' : response.users.Stamps[0].foto;
        this.usuario.estampaFavorita2 = (response.users.Stamps[1].foto===undefined) ? '' : response.users.Stamps[1].foto;
        this.usuario.estampaFavorita3 = (response.users.Stamps[2].foto===undefined) ? '' : response.users.Stamps[2].foto;
        console.log(this.usuario) // LOG:
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Usuario no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }
}
