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

  /**
  * La función ngOnInit llama a la función getUsersIdBasic para obtener la información
  * básica del usuario.
  */
  ngOnInit() {
    this.backendService.getUsersIdBasic(this.autor).subscribe(
      response => {
        this.usuario = {
          fotoPerfil: "data:image/png;base64," + response.users.fotoPerfil,
          usuario: response.users.usuario,
        }
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

  /**
  * La función bloquear llama a la función putAdminUsersId para bloquear al usuario indicado.
  */
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

  /**
  * La función activar llama a la función putAdminUsersId para activar al usuario indicado.
  */
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