/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de gestionar las denuncias del foro.
 * 
 * Archivo: denuncias-del-foro.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { MasDetallesComponent } from './mas-detalles/mas-detalles.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-denuncias-del-foro',
  templateUrl: './denuncias-del-foro.component.html',
  styleUrl: './denuncias-del-foro.component.css'
})
export class DenunciasDelForoComponent {
  denuncias: any[] = [];
  private respuesta: any[] = [];
  private todos: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) {
    var cockie = this.backendService.getCookie();
    var dataCockie = false;
    if (cockie) {
      dataCockie = cockie.esInvitado;
    }
  }

  /**
   * La función `ngOnInit` inicializa un componente estableciendo una llamada a 1 funcion interna del componente
   * y asignando valores iniciales a variables que hacen la pantalla responsive.
   */
  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getDenuncias();
  }

  /**
   * Función auxiliar para el testeo.
   * 
   */
  public getTodos() {
    return this.todos;
  }

  /**
   * Funcion auxiliar para el testeo.
   * 
   */
  public putRespuesta(respuesta: any[]) {
    this.respuesta = respuesta;
  }

  /**
   * La función `getDenuncias` hace una llamada a una función del backend, para obtener un listado de
   * sugerencias/quejas y posterirmente formatearlo 
   */
  getDenuncias() {
    this.todos = [];
    this.backendService.getAdminReports().subscribe(
      response => {
        this.respuesta = response.reports;
        this.formatear();
        this.denuncias = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * La función `formatear` es la encargada de dar el formato adecuado a la información recibida del backend.
   */
  formatear() {
    for (const item of this.respuesta) {
      if (!item.completada) {
        var data = {
          id: item._id,
          tipo: item.tipo,
          foto: "data:image/png;base64," + item.fotoPerfil, // TODO: Pedirle a backedn que me lo devuelva
          username: item.usuario,  //TODO: Pedirle a backend que me lo devuelva
          descripcion: item.descripcion,
          referencia: item.referencia,
          autor: item.autor,
          respuesta: item.reespuesta
        }

        this.todos.push(data);
      }
    }
    this.todos = this.todos.reverse()
  }

  /**
   * La función `rechazar` se ejecuta cuando el administrador rechaza la queja/sugerencia del usuario.
   * @param {string} referencia - El parametro `referencia` es la función `rechazar`se refiere al id 
   * de la queja/sugerencia qu el administrador ha decidido rechazar.
   */
  rechazar(referencia: string) {
    this.backendService.putApiAdminReportRejectId(referencia).subscribe(
      response => {
        this.getDenuncias();
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * La función `openDialogMasDestalles` abre una ventana de diálogo con datos y duraciones de
   * animación específicos, y actualiza las quejas/sugerencias después de cerrar el diálogo.
   * @param {string} enterAnimationDuration - El parámetro `enterAnimationDuration` en la función
   * `openDialogMasDestalles` se refiere a la duración de la animación cuando se
   * abre el cuadro de diálogo. Es un parámetro de tipo cadena que especifica cuánto tiempo debe durar
   * la animación cuando el cuadro de diálogo ingresa a la vista. Esta duración puede ser en
   * milisegundos o
   * @param {string} exitAnimationDuration - El parámetro `exitAnimationDuration` en la función
   * `openDialogMasDestalles` se refiere a la duración de la animación de salida
   * al cerrar el cuadro de diálogo. Este parámetro especifica cuánto tiempo debe durar la animación
   * cuando el cuadro de diálogo se cierra o se elimina de la pantalla. Se utiliza para controlar la
   * @param {string} id - El parámetro `id` en la función `openDialogMasDestalles` 
   * representa el identificador único o clave asociada con la sugerencia o elemento al que se
   * responde. Se utiliza para identificar la sugerencia específica a la que el usuario desea responder
   * dentro del diálogo.
   * @param {string} tipo - El parámetro `tipo` en la función `openDialogMasDestalles`
   * representa el tipo de sugerencia o comentario al que se responde. Podría ser una
   * categoría o clasificación que ayude a identificar la naturaleza de la sugerencia.
   * @param {string} info - El parámetro `info` en la función `openDialogMasDestalles`
   * representa información adicional relacionada con la sugerencia o el diálogo que se
   * abre. Esta información podría ser detalles, descripciones o cualquier otro dato relevante que deba
   * pasarse al componente de diálogo para su procesamiento o visualización.
   * @param {string} referencia - El parámetro `referencia` en la función `openDialogMasDestalles`
   * representa el id de la queja/sugerencia que se abrirá en el modal.
   */
  openDialogMasDestalles(enterAnimationDuration: string, exitAnimationDuration: string, id: string, tipo: string, info: string, referencia: string): void {
    const dialog = this.dialog.open(MasDetallesComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        tipo: tipo,
        info: info,
        referencia: referencia
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getDenuncias();
    });
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  /**
   * La función `getPaginatorData` actualiza los valores alto y bajo según el índice de página
   * proporcionado en el objeto de evento.
   * @param event - índice de página: número;
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
   * La función `onResize` ajusta el número de columnas y alturas de filas según el ancho de la
   * ventana.
   * @param {any} event - El parámetro `event` en la función `onResize` es un objeto que representa el
   * evento desencadenado cuando se cambia el tamaño de la ventana. Contiene información sobre el
   * evento, como el elemento de destino (en este caso, la ventana), que se puede usar para acceder a
   * propiedades como `innerWidth` para determinar
   */
  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
