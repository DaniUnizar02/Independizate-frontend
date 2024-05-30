/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar los mensajes de
 * diferentes conversaciones.
 * 
 * Archivo: conversacion.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { AnadirConversacionComponent } from './anadir/anadir.component';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';
import { ActivatedRoute } from '@angular/router';
import { ResponderMensajeComponent } from './responder-mensaje/responder-mensaje.component';
import { PonerDenunciaComponent } from '../poner-denuncia/poner-denuncia.component';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrl: './conversacion.component.css'
})
export class ConversacionComponent {
  invitado: boolean;

  mensajes: any[] = [];
  private todos: any[] = [];

  id: string = '';

  post = {
    id: '',
    userName: '',
    autor: '',
    foto: '',
    title: '',
    description: '',
    categoria: ''
  }

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) {
    var cockie = this.backendService.getCookie();
    var dataCockie = false;
    if (cockie) {
      dataCockie = cockie.esInvitado;
    }
    this.invitado = dataCockie;

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = idParam;
    } else {
      // Manejar el caso cuando el id es null
      console.error('El parámetro id no está presente en la ruta.');
    }
  }


  /*
  * La función nogOnInit llama a la funcion getPosts al iniciar el componente.
  */
  ngOnInit() {
    this.getPosts();
  }

  /**
   * Función que obtiene los mensajes de una conversación a traves de una
   * petición al backend.
   */
  private getPosts() {
    this.todos = [];
    this.backendService.getPostsIdMessages(this.id).subscribe(
      response => {
        var respuesta = response.respuesta;
        console.log(respuesta); // LOG:
        this.post = {
          id: respuesta.post._id,
          userName: respuesta.post.usuario,
          autor: respuesta.post.autor,
          foto: "data:image/png;base64," + respuesta.post.fotoPerfil,
          title: respuesta.post.titulo.toUpperCase(),
          description: respuesta.post.descripcion,
          categoria: respuesta.post.categoria,
        }

        this.formatear(respuesta.mensajes);
        this.mensajes = this.todos;
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Mensaje no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * Función que construye los mensajes de una conversación en el foro
   * de conversación.
   * @param mensajes 
   * @param tabulado 
   */
  private construir_mensajes(mensajes: any[], tabulado: boolean) {
    for (const item of mensajes) {
      console.log("ITEM: ", item); //LOG:
      var data = {
        id: item._id,
        userName: item.usuario,
        autor: item.autor,
        foto: "data:image/png;base64," + item.fotoPerfil,
        description: item.informacion,
        tabulado: tabulado // DONE: tiene que depender de un parámetro, aun no se como hacerlo NOTE: Hablarlo con backend
      };

      console.log(data); // LOG:
      this.todos.push(data);

      if ('respuesta' in item && item.respuesta && item.respuesta.length !== 0) {
        this.construir_mensajes(item.respuesta, true);
      }
    }
  }
  
  /**
   * Función da formato a los mensajes de una conversación en el foro.
   * @param mensajes 
   */
  private formatear(mensajes: any): void {
    if (mensajes.length!== 0) {
      this.construir_mensajes(mensajes, false);
      console.log("CP: ", this.todos); // LOG:
    }
  }

  // NOTE: Ver usuario
  /**
   * Función que abre un dialogo con la información de un usuario.
   * @param enterAnimationDuration 
   * @param exitAnimationDuration 
   * @param autor 
   */
  openDialogUsuario(enterAnimationDuration: string, exitAnimationDuration: string, autor: string): void {
    this.dialog.open(VerUsuarioComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { autor: autor }
    });
  }

  // NOTE: Añadir mensaje

  /**
   * Función que abre un dialogo para añadir un mensaje a una conversación.
   * @param enterAnimationDuration 
   * @param exitAnimationDuration 
   * @param post_id 
   */
  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string, post_id: string): void {
    const dialog = this.dialog.open(AnadirConversacionComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { post_id: post_id }
    });

    dialog.afterClosed().subscribe(() => {
      this.getPosts();
    });
  }

  // NOTE: Responder

  /**
   * Función que abre un dialogo para responder a un mensaje.
   * @param enterAnimationDuration 
   * @param exitAnimationDuration 
   * @param post_id 
   * @param message_id 
   */
  openDialogResponder(enterAnimationDuration: string, exitAnimationDuration: string, post_id: string, message_id: string): void {
    const dialog = this.dialog.open(ResponderMensajeComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { 
        post_id: post_id,
        message_id: message_id
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getPosts();
    });
  }

  // NOTE: Denuncia
  /**
   * Función que abre un dialogo para poner una denuncia a un post.
   * @param enterAnimationDuration 
   * @param exitAnimationDuration 
   * @param post_id 
   */
  openDialogDenuncia(enterAnimationDuration: string, exitAnimationDuration: string, post_id: string): void {
    const dialog = this.dialog.open(PonerDenunciaComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { post_id: post_id }
    });
  }
}



