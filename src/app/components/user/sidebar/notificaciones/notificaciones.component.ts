/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de la gestión de las notificaciones.
 * 
 * Archivo: notificaciones.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { VerNotificacionComponent } from './ver-notificacion/ver-notificacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
  notificaciones: any[] = [];
  private notiLeidas: any[] = [];
  private notiNoLeidas: any[] = [];
  private respuesta: any[] = [];

  constructor(public dialog: MatDialog, private location: Location, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit(): void {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2.5:1' : '3.5:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
    
    this.getNotificaciones();
  }

  private getNotificaciones() {
    this.notiLeidas = [];
    this.notiNoLeidas = [];
    this.backendService.getNotificationsAutorAutor(this.backendService.cookie.usuario).subscribe(
      response => {
        this.respuesta = response.respuesta.notificaciones
        console.log('Notificaciones: ', this.respuesta); // LOG:
        this.formatear();
        this.notificaciones = this.notiNoLeidas.concat(this.notiLeidas);
        console.log("Notis Leidas: ", this.notiLeidas); // LOG:
        console.log("Notis NO Leidas: ", this.notiNoLeidas); // LOG:
        console.log("Notis Todas: ", this.notificaciones); // LOG:
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron notificaciones.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  private formatear(): void {
    for (const item of this.respuesta) {
      var data = {
        id: item._id,
        color: '',
        titulo: item.asunto.nombreForo,
        subtitulo: item.titulo,
        cuerpo: item.cuerpoNotificacion,
        idPost: item.asunto.idPost,
        idMensaje: item.asunto.idMensaje
      }
      if (item.leida) { data.color = '#3F3F4F' }

      if (item.asunto.nombreForo === "compagneroDePiso") { data.titulo = "Compañero de Piso" }
      else if (item.asunto.nombreForo === "recetas") { data.titulo = "Recetas" }
      else if (item.asunto.nombreForo === "economiaDomestica") { data.titulo = "Economía Doméstica" }
      else if (item.asunto.nombreForo === "limpieza") { data.titulo = "Limpieza" }
      else if (item.asunto.nombreForo === "otros") { data.titulo = "Otros" }

      // console.log(data); // LOG:

      if (item.leida) { this.notiLeidas.push(data); }
      else { this.notiNoLeidas.push(data); }
    }
  }

  notificacionLeida(notificacion_id: string, notificacion_color: string): void {   
    // console.log(notificacion_color)
    if (notificacion_color == '') {
      this.backendService.putNotificationsIdRead(notificacion_id).subscribe(
        response => {
          this.openDialogVer('0ms', '0ms', notificacion_id);
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
    } else {
      this.openDialogVer('0ms', '0ms', notificacion_id);
    }
  }

  openDialogVer(enterAnimationDuration: string, exitAnimationDuration: string, referencia: string): void {
    const dialog = this.dialog.open(VerNotificacionComponent, {
      width: '80%',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        notificacion: this.notificaciones.filter(item => item.id === referencia)
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getNotificaciones(); 
    });
  }

  goBack(): void {
    this.location.back();
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  getPaginatorData(event: { pageIndex: number; }) {
    console.log(event);
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  // NOTE: RESPONSIVE

  numCols: number = 2;
  rowHeight: string = '2.5:1'
  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2.5:1' : '3.5:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
