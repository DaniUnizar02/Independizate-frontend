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
          foto: response.users.fotoPerfil,
          nombre: response.users.usuario,
          reputacion: response.users.reputacion,
        }
        console.log("USUARIO SIDEBAR", this.usuario); // LOG:
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
