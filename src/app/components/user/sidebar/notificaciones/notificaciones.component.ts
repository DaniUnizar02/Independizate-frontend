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

  /**
   * La función ngOnInit se ajusta el diseño según el ancho de la ventana
   * y obtiene las notificaciones del usuario.
   */
  ngOnInit(): void {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2.5:1' : '3.5:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getNotificaciones();
  }

  /**
   * La función `getNotificaciones` se utiliza para obtener las notificaciones del usuario.
   */
  private getNotificaciones() {
    this.notiLeidas = [];
    this.notiNoLeidas = [];

    var cockie = this.backendService.getCookie();
    var dataCockie = '';
    if (cockie) {
      dataCockie = cockie.usuario;
    }

    this.backendService.getNotificationsAutorAutor(dataCockie).subscribe(
      response => {
        this.respuesta = response.respuesta.notificaciones
        this.formatear();
        this.notificaciones = this.notiNoLeidas.concat(this.notiLeidas);
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

  /**
   * La función `formatear` se utiliza para formatear los datos de la respuesta de la API.
   */
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

      if (item.leida) { this.notiLeidas.push(data); }
      else { this.notiNoLeidas.push(data); }
    }
  }

  /**
   * La función `notificacionLeida` se utiliza para marcar una notificación como leída.
   * @param notificacion_id 
   * @param notificacion_color 
   */
  notificacionLeida(notificacion_id: string, notificacion_color: string): void {
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

  /**
   * La función `openDialogVer` se utiliza para abrir el dialogo de ver notificación.
   * @param enterAnimationDuration 
   * @param exitAnimationDuration 
   * @param referencia 
   */
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

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  /**
   * Función que actualiza los datos del paginador.
   * @param event 
   */
  getPaginatorData(event: { pageIndex: number; }) {
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

  /**
   * La función `onResize` se ejecuta al redimensionar
   * la ventana del navegador para ajustar el número de columnas y la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2.5:1' : '3.5:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
