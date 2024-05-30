/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar los diferentes mensajes
 * guardados.
 * 
 * Archivo: guardados.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../../services/error/error.service';
import { AnadirPostComponent } from '../../anadir-post/anadir-post.component';
import { PonerDenunciaComponent } from '../../poner-denuncia/poner-denuncia.component';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.component.html',
  styleUrl: './guardados.component.css'
})
export class GuardadosComponent {
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
   * La función `ngOnInit` ajusta el diseño según el ancho de la ventana
   * y se encarga de obtener los posts guardados si el usuario no es invitado.
   */
  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    if (!this.invitado){
      this.getMyPosts();
      this.getPosts();
    }
  }

  /**
   * La función getMyPosts se encarga de obtener los posts guardados o favoritos del el usuario.
   */
  private getMyPosts () {
    // Se ha insertado un usuario por defecto pero tiene que ser variable
    // console.log("USUARIO: ", this.backendService.user); // LOG:
    var cockie = this.backendService.getCookie();
      var dataCockie = '';
      if (cockie) {
        dataCockie = cockie.usuario;
      }
    this.backendService.getProfilesId(dataCockie).subscribe(
      response => {
        console.log("response: ",response.user) // LOG:
        this.postsFavs = (response.user.forosFavoritos===undefined) ? [] : response.user.forosFavoritos;
        this.postsLike = (response.user.forosLike===undefined) ? [] : response.user.forosLike;
        console.log("FAVS: ", this.postsFavs); // LOG:
        console.log("LIKE: ", this.postsLike); // LOG:
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
   * La función getPosts se encarga de obtener los posts favoritos del usuario.
   */
  private getPosts() {
    this.todos = [];
    this.backendService.getForumCategoriaPostsFavs("forosFavoritos").subscribe(
      response => {
        console.log('Favoritos (Foro): ', response.posts); // LOG:
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
   * La función formatear se encarga de dar formato a los posts.
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

      console.log(data); // LOG:
      this.todos.push(data);
    }
    console.log("G: ",this.todos); // LOG:
    this.todos = this.todos.reverse();
  }

  /**
   * La función buscar se encarga de buscar un post en concreto.
   */
  buscar() {
    console.log(this.value);
    if(!this.value.trim()) {
      this.posts = this.todos;
    } else {
      this.value = this.value.toLowerCase();
      this.posts = this.todos.filter((item: { title: string; description: string; }) =>
        item.title.toLowerCase().includes(this.value) || item.description.toLowerCase().includes(this.value)
      )
      
    }
  }

  /**
   * Función encargada de gestionar la ruta a la que se redirige el usuario
   * @param event 
   */
  cambiarRoute(event: MatTabChangeEvent) {
    var ruta = event.tab.textLabel.toLowerCase().replace(' ', '-');
    console.log(ruta);
    if (ruta=="compañero-de piso") {
      ruta = "piso";
    } else if (ruta=="economía-doméstica") {
      ruta = "economia";
    }
    console.log(ruta);
    this.router.navigate(['sidebar','foro', ruta])
  }

  // NOTE: Conversación

  /**
   * Función que navega a la conversación de un post.
   * @param post_id 
   */
  navigateToConversacion(post_id: string) {
    this.router.navigate(['sidebar','foro','conversacion', post_id])
  }

  // NOTE: Like

  /**
   * Función que da like a un post.
   * @param post_id 
   */
  darLike(post_id: string) {
    console.log(post_id); // LOG:
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
 * La función hacerFav se encarga de añadir un post a favoritos.
 * @param post_id 
 */
  hacerFav(post_id: string) {
    console.log(post_id); // LOG:
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
  /** Esta función abre un dialogo para poner una denuncia.
   * 
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
   * Función que actualiza los datos del paginador.
   * @param event 
   */
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
  rowHeightBusc: string = '2:1'

  /**
   * La función `onResize` se ejecuta al redimensionar
   * la ventana del navegador para ajustar el número de columnas y la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
