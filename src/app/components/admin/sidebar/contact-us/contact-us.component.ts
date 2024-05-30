/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de gestionar los mensajes de contacto con
 * administración de los usuarios.
 * 
 * Archivo: contact-us.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ResponderSugerenciaComponent } from './responder/responder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsDeUsuarioComponent {
  tipo = 'todos';
  contacts: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

 /**
  * La función ngOnInit ajusta el diseño según el ancho de la ventana para mejorar la capacidad de
  * respuesta y luego llama a la función getContact.
  */
  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (window.innerWidth <= 1200) ? '1:2' : '2:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getContact();
  }

  /**
   * La función `getContact` realiza una solicitud al servicio backend para obtener sugerencias del
   * administrador, maneja diferentes estados de error y procesa los datos de respuesta.
   */
  getContact() {
    this.backendService.getAdminSuggestions().subscribe(
      response => {
        this.respuesta = response
        this.formatear();
        this.contacts = this.todos;
        this.filtrar();
      },
      error => {
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se han encontrado quejas/sugerencias.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * La función "filtrar" filtra una lista de contactos según un tipo específico.
   */
  filtrar(): void {
    if (!this.tipo.trim()) {
      this.contacts = this.todos
    } else {
      if (this.tipo == 'todos') {
        this.contacts = this.todos
      } else {
        this.tipo = this.tipo.toLowerCase();
        this.contacts = this.todos.filter(item =>
          item.tipo.toLowerCase().includes(this.tipo)
        );
      }
    }
  }

  /**
   * La función `formatear` procesa datos de una respuesta, filtra elementos incompletos, formatea los
   * datos e invierte el orden antes de almacenarlos en una variable.
   */
  private formatear(): void {
    this.todos = []
    for (const item of this.respuesta) {
      if (!item.completada) {
        var data = {
          id: item._id,
          foto: "data:image/png;base64," + item.fotoPerfil, // TODO: Pedirle a backedn que me lo devuelva
          username: item.usuario,  //TODO: Pedirle a backend que me lo devuelva
          usuario: item.autor,
          tipo: item.tipo,
          info: item.descripcion,
          titulo: item.titulo
        }
        this.todos.push(data);
      }
    }
    this.todos = this.todos.reverse()
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * La función "rechazar" envía una solicitud PUT para rechazar una sugerencia por su ID y maneja
   * diferentes respuestas de error en consecuencia.
   * @param {string} id - El método `rechazar` que proporcionó parece manejar el rechazo de sugerencias
   * del administrador según el parámetro `id` que se le pasó. Al llamar a este método, deberá
   * proporcionar el "id" de la sugerencia/comentario que desea rechazar.
   */
  rechazar(id: string) {
    this.backendService.putAdminSuggestionsRejectId(id).subscribe(
      response => {
        this.getContact();
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos.");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se ha encontrado la sugerencia/queja indicada.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * La función `openDialogResponderSugerencia` abre una ventana de diálogo con datos y duraciones de
   * animación específicos, y actualiza los contactos después de cerrar el diálogo.
   * @param {string} enterAnimationDuration - El parámetro `enterAnimationDuration` en la función
   * `openDialogResponderSugerencia` se refiere a la duración de la animación cuando se
   * abre el cuadro de diálogo. Es un parámetro de tipo cadena que especifica cuánto tiempo debe durar
   * la animación cuando el cuadro de diálogo ingresa a la vista. Esta duración puede ser en
   * milisegundos o
   * @param {string} exitAnimationDuration - El parámetro `exitAnimationDuration` en la función
   * `openDialogResponderSugerencia` se refiere a la duración de la animación de salida
   * al cerrar el cuadro de diálogo. Este parámetro especifica cuánto tiempo debe durar la animación
   * cuando el cuadro de diálogo se cierra o se elimina de la pantalla. Se utiliza para controlar la
   * @param {string} id - El parámetro `id` en la función `openDialogResponderSugerencia` 
   * representa el identificador único o clave asociada con la sugerencia o elemento al que se
   * responde. Se utiliza para identificar la sugerencia específica a la que el usuario desea responder
   * dentro del diálogo.
   * @param {string} tipo - El parámetro `tipo` en la función `openDialogResponderSugerencia`
   * representa el tipo de sugerencia o comentario al que se responde. Podría ser una
   * categoría o clasificación que ayude a identificar la naturaleza de la sugerencia.
   * @param {string} info - El parámetro `info` en la función `openDialogResponderSugerencia`
   * representa información adicional relacionada con la sugerencia o el diálogo que se
   * abre. Esta información podría ser detalles, descripciones o cualquier otro dato relevante que deba
   * pasarse al componente de diálogo para su procesamiento o visualización.
   */
  openDialogResponderSugerencia(enterAnimationDuration: string, exitAnimationDuration: string, id: string, tipo: string, info: string): void {
    const dialog = this.dialog.open(ResponderSugerenciaComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { 
        id: id,
        tipo: tipo,
        info: info
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getContact();
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
  rowHeightBusc: string = '2:1'
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
    this.rowHeightBusc = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
