/**
 * Proyecto: Independizate
 * Descripción: Fichero que proporciona la base para la visualización de los
 * datos relacionados con el estado de un usuario.
 * 
 * Archivo: estado-usuario.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-estado-usuario',
  templateUrl: './estado-usuario.component.html',
  styleUrl: './estado-usuario.component.css'
})
export class EstadoUsuarioComponent {
  usuario = {
    fotoPerfil: '',
    usuario: '',
  }
  private autor: string;
  private estado: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EstadoUsuarioComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.autor = data.id;
    this.estado = data.estado;
  }

  ngOnInit() {
    this.backendService.getUsersIdBasic(this.autor).subscribe(
      response => {
        console.log("RESPONSE: ", response.users) // LOG:
        this.usuario = {
          fotoPerfil: response.users.fotoPerfil,
          usuario: response.users.usuario,
        }
        console.log(this.usuario) // LOG:
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("No se ha encontrado el usuario indicado.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se ha encontrado el usuario indicado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  bloquear() {
    if (this.estado=='Activo') {
      this.backendService.putAdminUsersId(this.autor).subscribe(
        response => {
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos.");
          } else if (error.status === 403) {
            this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
          } else if (error.status === 404) {
            this.errorService.openDialogError("No se ha encontrado el usuario.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    } else {
      this.dialogRef.close();
    }
  }

  activar() {
    if (this.estado=='Bloqueado') {
      this.backendService.putAdminUsersId(this.autor).subscribe(
        response => {
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos.");
          } else if (error.status === 403) {
            this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
          } else if (error.status === 404) {
            this.errorService.openDialogError("No se ha encontrado el usuario.");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    } else {
      this.dialogRef.close();
    }
  }
}