/**
 * Proyecto: Independizate
 * Descripción: Descripción: Fichero encargado de la muestra de la barra lateral del administrador
 * y la visualización de diferentes componentes.
 * Archivo: sidebar.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, ViewChild } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ErrorService } from '../../../services/error/error.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  invitado: boolean;

  usuario = {
    foto: '',
    nombre: '',
    reputacion: '',
    estampa1: '',
    estampa2: '',
    estampa3: ''
  };
  mostarStamp1 = false;
  mostarStamp2 = false;
  mostarStamp3 = false;

  constructor(private backendService: BackendService, private errorService: ErrorService) {
    this.invitado = this.backendService.cookie.esInvitado;

    if (!this.invitado){
      this.getUsuario();
    } else {
      this.usuario.foto = 'src/assets/img/badge1.png'; 
    }
  }

  getUsuario() {
    this.backendService.getUsersIdBasic(this.backendService.cookie.usuario).subscribe(
      response => {
        console.log(response.users.fotoPerfil); //LOG:
        this.usuario = {
          foto: "data:image/png;base64," + response.users.fotoPerfil,
          nombre: response.users.usuario,
          reputacion: response.users.reputacion,
          estampa1: '',
          estampa2: '',
          estampa3: ''
        }
        this.usuario.estampa1 = (response.users.Stamps[0].foto===undefined || response.users.Stamps[0].foto===null) ? '' : "data:image/png;base64," + response.users.Stamps[0].foto;
        this.mostarStamp1 = (response.users.Stamps[0].foto===undefined || response.users.Stamps[0].foto===null) ? false : true;
        this.usuario.estampa2 = (response.users.Stamps[1].foto===undefined || response.users.Stamps[1].foto===null) ? '' : "data:image/png;base64," + response.users.Stamps[1].foto;
        this.mostarStamp2 = (response.users.Stamps[1].foto===undefined || response.users.Stamps[1].foto===null) ? false : true;
        this.usuario.estampa3 = (response.users.Stamps[2].foto===undefined || response.users.Stamps[2].foto===null) ? '' : "data:image/png;base64," + response.users.Stamps[2].foto;
        this.mostarStamp3 = (response.users.Stamps[2].foto===undefined || response.users.Stamps[2].foto===null) ? false : true;
        console.log("USUARIO SIDEBAR",this.usuario); // LOG:
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
