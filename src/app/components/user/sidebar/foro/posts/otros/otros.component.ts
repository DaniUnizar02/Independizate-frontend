/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar los diferentes mensajes
 * de la categoría "Otros".
 * 
 * Archivo: otros.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { PostsComponent } from '../posts.component';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../../services/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { AnadirPostComponent } from '../../anadir-post/anadir-post.component';
import { PonerDenunciaComponent } from '../../poner-denuncia/poner-denuncia.component';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrl: './otros.component.css'
})
export class OtrosComponent {
  invitado: boolean;

  posts: any[] = [];
  private todos: any[] = [];

  private postsFavs: any[] = [];
  private postsLike: any[] = [];

  value: string = '';

  constructor(public dialog: MatDialog, private router: Router, private backendService: BackendService, private errorService: ErrorService) {
    var cockie = this.backendService.getCookie();
    var dataCockie = false;
    if (cockie) {
      dataCockie = cockie.esInvitado;
    }
    this.invitado = dataCockie;
  }

  /**
   * La función `ngOnInit` ajusta el diseño según el ancho de la ventana para mejorar la capacidad de
   * respuesta y obtiene los posts de la categoría "Otros".
   */
  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    if (!this.invitado) {
      this.getMyPosts();
    }
    this.getPosts();
  }

  /**
   * Obtiene los posts del usuario.
   */
  private getMyPosts() {
    // Se ha insertado un usuario por defecto pero tiene que ser variable
    var cockie = this.backendService.getCookie();
    var dataCockie = '';
    if (cockie) {
      dataCockie = cockie.usuario;
    }

    this.backendService.getProfilesId(dataCockie).subscribe(
      response => {
        this.postsFavs = (response.user.forosFavoritos === undefined) ? [] : response.user.forosFavoritos;
        this.postsLike = (response.user.forosLike === undefined) ? [] : response.user.forosLike;
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Usuario no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * Obtiene los posts de la categoría "Otros".
   */
  private getPosts() {
    if (this.invitado) {
      this.getPostsGuest();
    } else {
      this.getPostsUser();
    }
  }

  /**
   * Obtiene los posts de la categoría "Otros" de un usuario.
   */
  private getPostsUser() {
    this.todos = [];
    this.backendService.getForumCategoriaPostsFavs("otros").subscribe(
      response => {
        this.formatear(response.posts);
        this.posts = this.todos;
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Foro no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * Obtiene los posts de la categoría "Otros" de un usuario invitado.
   */
  private getPostsGuest() {
    this.todos = [];
    this.backendService.getForumCategoriaPosts("otros").subscribe(
      response => {
        this.formatear(response.posts);
        this.posts = this.todos;
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Foro no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  /**
   * Formatea los posts de la categoría "Otros".
   * @param posts 
   */
  private formatear(posts: any): void {
    for (const item of posts) {
      var data = {
        id: item._id,
        userName: item.usuario,
        autor: item.autor,
        foto: "data:image/png;base64," + item.fotoPerfil,
        title: item.titulo,
        description: item.descripcion,
        categoria: item.categoria,
        like: 'white',
        fav: 'white',
      };

      if (this.postsFavs.includes(data.id)) { data.fav = 'orange'; }
      if (this.postsLike.includes(data.id)) { data.like = 'red'; }

      this.todos.push(data);
    }
    this.todos = this.todos.reverse();
  }

  /**
   * Busca los posts de la categoría "Otros" en función de la query introducida.
   */
  buscar() {
    if (!this.value.trim()) {
      this.posts = this.todos;
    } else {
      this.value = this.value.toLowerCase();
      this.posts = this.todos.filter((item: { title: string; description: string; }) =>
        item.title.toLowerCase().includes(this.value) || item.description.toLowerCase().includes(this.value)
      )

    }
  }

  /**
   * Cambia la ruta de la página.
   * @param event 
   */
  cambiarRoute(event: MatTabChangeEvent) {
    var ruta = event.tab.textLabel.toLowerCase().replace(' ', '-');
    if (ruta == "compañero-de piso") {
      ruta = "piso";
    } else if (ruta == "economía-doméstica") {
      ruta = "economia";
    }
    this.router.navigate(['sidebar', 'foro', ruta])
  }

  // NOTE: Añadir post
  /**
   * Esta función abre un dialogo para añadir una gatpp 
   * @param enterAnimationDuration 
   * @param exitAnimationDuration 
   * @param categoria 
   */
  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string, categoria: string): void {
    const dialog = this.dialog.open(AnadirPostComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { categoria: categoria }
    });

    dialog.afterClosed().subscribe(() => {
      this.getPosts();
    });
  }

  // NOTE: Conversación
  /**
   * La función `navigateToConversacion` se utiliza para navegar
   *  a la página de conversación de un post.
   * @param post_id 
   */
  navigateToConversacion(post_id: string) {
    this.router.navigate(['sidebar', 'foro', 'conversacion', post_id])
  }

  // NOTE: Like

  /**
   * Función que da like a un post de id post_id.
   * @param post_id 
   */
  darLike(post_id: string) {
    this.backendService.putPostsLikePostId(post_id).subscribe(
      response => {
        this.getMyPosts();
        this.getPosts();
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Post no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  // NOTE: Fav
  /**
   * Función que añade un post a favoritos de id post_id.
  */
  hacerFav(post_id: string) {
    this.backendService.putPostsFavoritesPostId(post_id).subscribe(
      response => {
        this.getMyPosts();
        this.getPosts();
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Post no encontrado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  // NOTE: Denuncia
  /**
   * This function opens a dialog to report a post.
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

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  /**
   * Esta función actualiza los datos del paginador.
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
  rowHeightBusc: string = '2:1'

  /**
   * Función que se ejecuta al redimensionar la ventana del navegador
   * para ajustar el número de columnas y la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
