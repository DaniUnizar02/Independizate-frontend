import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerUsuarioComponent } from './ver-usuario/ver-usuario.component';
import { AnadirConversacionComponent } from './anadir-conversacion/anadir-conversacion.component';
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
  mensajes: any[] = [];
  private todos: any[] = [];

  id: string = '';

  post = {
    id: '',
    userName: '',
    autor: '',
    title: '',
    description: '',
    categoria: ''
  }

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = idParam;
    } else {
      // Manejar el caso cuando el id es null
      console.error('El parámetro id no está presente en la ruta.');
    }
  }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.todos = [];
    this.backendService.getPostsIdMessages(this.id).subscribe(
      response => {
        var respuesta = response.respuesta;
        console.log(respuesta); // LOG:
        this.post = {
          id: respuesta.post._id,
          userName: respuesta.post.usuario, // REVIEW: No me lo pasa el backend
          autor: respuesta.post.autor,
          title: respuesta.post.titulo.toUpperCase(),
          description: respuesta.post.descripcion,
          categoria: respuesta.post.categoria,
        }
        this.formatear(respuesta.mensajes);
        this.mensajes = this.todos;
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

  private construir_mensajes(mensajes: any[], tabulado: boolean) {
    for (const item of mensajes) {
      var data = {
        id: item._id,
        userName: item.usuario,
        autor: item.autor,
        description: item.informacion,
        tabulado: tabulado // TODO: tiene que depender de un parámetro, aun no se como hacerlo NOTE: Hablarlo con backend
      };

      console.log(data); // LOG:
      this.todos.push(data);

      if ('respuesta' in item && item.respuesta && item.respuesta.length !== 0) {
        this.construir_mensajes(item.respuesta, true);
      }
    }
  }
  
  // TODO: No se muestran bien el orden de mensajes, y donde va cada respuesta 😀
  private formatear(mensajes: any): void {
    if (mensajes.length!== 0) {
      this.construir_mensajes(mensajes, false);
      console.log("CP: ", this.todos); // LOG:
    }
  }

  // NOTE: Ver usuario

  openDialogUsuario(enterAnimationDuration: string, exitAnimationDuration: string, autor: string): void {
    this.dialog.open(VerUsuarioComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { autor: autor }
    });
  }

  // NOTE: Añadir mensaje

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

  openDialogDenuncia(enterAnimationDuration: string, exitAnimationDuration: string, post_id: string): void {
    const dialog = this.dialog.open(PonerDenunciaComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { post_id: post_id }
    });
  }
}



