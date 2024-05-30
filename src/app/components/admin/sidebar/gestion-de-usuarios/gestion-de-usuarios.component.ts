/**
 * Proyecto: Independizate
 * Descripción: Fichero para la gestión de usuarios por los administradores.
 * 
 * Archivo: gestion-de-usuarios.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoUsuarioComponent } from './estado-usuario/estado-usuario.component';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrl: './gestion-de-usuarios.component.css'
})
export class GestionDeUsuariosComponent {
  value: string = '';
  users: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

  /**
  * La función ngOnInit llama a la función getUsuarios y inicializa la 
  * variable responsivel del título.
  */
  ngOnInit(): void {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getUsuarios();
  }

  /**
  * La función getUsuarios llama a la función getUsers para obtener un listado de todos
  * los usuarios de nuestra aplicación.
  */
  getUsuarios() {
    this.backendService.getUsers().subscribe(
      response => {
        this.respuesta = response.users
        this.formatear();
        this.users = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 401) {
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
  * La función buscar permite realizar búsquedas de información
  * sobre el parámetro value.
  */
  buscar(): void {
    if (!this.value.trim()) {
      this.users = this.todos
    } else {
      this.value = this.value.toLowerCase();
      this.users = this.todos.filter(item =>
        item.usuario.toLowerCase().includes(this.value)
      );
    }
  }

  /**
   * La función `formatear` procesa datos de una respuesta, filtra elementos incompletos, formatea los
   * datos e invierte el orden antes de almacenarlos en una variable.
   */
  private formatear(): void {
    this.todos = []
    for (const item of this.respuesta) {
      var data = {
        id: item._id,
        usuario: item.nombre,
        correo: item.correo,
        reputacion: item.reputacion,
        edad: item.edad,
        denuncias: item.denuncias,
        post: item.publicaciones,
        estado: item.activo
      }

      data.estado = item.bloqueado ? 'Bloqueado' : 'Activo';

      this.todos.push(data);
    }
    this.todos = this.todos.reverse()
  }

  /**
   * La función `openDialogEstadoUsuario` abre una ventana de diálogo con datos y duraciones de
   * animación específicos, y actualiza los ususarios después de cerrar el diálogo.
   * @param {string} enterAnimationDuration - El parámetro `enterAnimationDuration` en la función
   * `openDialogEstadoUsuario` se refiere a la duración de la animación cuando se
   * abre el cuadro de diálogo. Es un parámetro de tipo cadena que especifica cuánto tiempo debe durar
   * la animación cuando el cuadro de diálogo ingresa a la vista. Esta duración puede ser en
   * milisegundos o
   * @param {string} exitAnimationDuration - El parámetro `exitAnimationDuration` en la función
   * `openDialogEstadoUsuario` se refiere a la duración de la animación de salida
   * al cerrar el cuadro de diálogo. Este parámetro especifica cuánto tiempo debe durar la animación
   * cuando el cuadro de diálogo se cierra o se elimina de la pantalla. Se utiliza para controlar la
   * @param {string} id - El parámetro `id` en la función `openDialogEstadoUsuario` 
   * representa el identificador único o clave asociada con el usuario al que se
   * responde. Se utiliza para identificar al usuario específico a la que el administrador desea activar/bloquear
   * dentro del diálogo.
   * @param {string} estado - El parámetro `estado` en la función `openDialogEstadoUsuario`
   * representa el estado del usuario al que corresponde.
   */
  openDialogEstadoUsuario(enterAnimationDuration: string, exitAnimationDuration: string, id: string, estado: string): void {
    const dialog = this.dialog.open(EstadoUsuarioComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        estado: estado
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getUsuarios();
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
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
