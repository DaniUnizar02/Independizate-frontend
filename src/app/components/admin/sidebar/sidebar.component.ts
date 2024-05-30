/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de la muestra de la barra lateral del administrador
 * y la visualización de diferentes componentes.
 * 
 * Archivo: sidebar.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, ViewChild } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';
import { ErrorService } from '../../../services/error/error.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponentAdmin {
  usuario = {
    foto: '',
    nombre: '',
    reputacion: '',
  };

  constructor(private backendService: BackendService, private errorService: ErrorService) {
    this.getUsuario();
  }

  getUsuario() {
    this.backendService.getUsersIdBasic(this.backendService.cookie.usuario).subscribe(
      response => {
        // console.log(response.users.fotoPerfil); //LOG:
        this.usuario = {
          foto: "data:image/png;base64," + response.users.fotoPerfil,
          nombre: response.users.usuario,
          reputacion: response.users.reputacion,
        }
        console.log("USUARIO SIDEBAR", this.usuario); // LOG:
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

  // NOTE: RESPONSIVE

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('sidenav1') sidenav1!: MatSidenav;

  onResize(event: any) {
    if (event.target.innerWidth > 600) {
      this.sidenav.open();
      this.sidenav1.close();
    }
  }
}
