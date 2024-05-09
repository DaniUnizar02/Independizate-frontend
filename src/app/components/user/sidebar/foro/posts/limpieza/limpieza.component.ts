import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../../../../services/error/error.service';
import { BackendService } from '../../../../../../services/backend/backend.service';
import { AnadirPostComponent } from '../../anadir-post/anadir-post.component';
import { PonerDenunciaComponent } from '../../poner-denuncia/poner-denuncia.component';

@Component({
  selector: 'app-limpieza',
  templateUrl: './limpieza.component.html',
  styleUrl: './limpieza.component.css'
})
export class LimpiezaComponent {
  posts: any[] = [];
  private todos: any[] = [];

  private postsFavs: any[] = [];
  private postsLike: any[] = [];

  value: string = '';
  
  constructor(public dialog: MatDialog, private router: Router, private backendService: BackendService, private errorService: ErrorService) {}

  ngOnInit() {
    this.getMyPosts();
    this.getPosts();
  }

  private getMyPosts () {
    // Se ha insertado un usuario por defecto pero tiene que ser variable
    console.log("USUARIO: ", this.backendService.user); // LOG:
    this.backendService.getProfilesId(this.backendService.user).subscribe(
      response => {
        this.postsFavs = response.forosFavoritos;
        this.postsLike = response.forosLike;
        console.log("FAVS: ", this.postsFavs); // LOG:
        console.log("LIKE: ", this.postsLike); // LOG:
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
  
  getPosts() {
    this.todos = [];
    this.backendService.getForumCategoriaPostsFavs("limpieza").subscribe(
      response => {
        console.log('Limpieza (Foro): ', response.posts); // LOG:
        this.formatear(response.posts);
        this.posts = this.todos;
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

  private formatear(posts: any): void {
    for (const item of posts) {
      var data = {
        id: item._id,
        userName: item.usuario,
        autor: item.autor,
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
    console.log("L: ",this.todos); // LOG:
    this.todos = this.todos.reverse();
  }

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

  // NOTE: Añadir post

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

  navigateToConversacion(post_id: string) {
    this.router.navigate(['sidebar','foro','conversacion', post_id])
  }

  // NOTE: Like

  darLike(post_id: string) {
    console.log(post_id); // LOG:
    this.backendService.putPostsLikePostId(post_id).subscribe(
      response => {
        this.getMyPosts();
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("El post ya tiene tu like.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  // NOTE: Fav

  hacerFav(post_id: string) {
    console.log(post_id); // LOG:
    this.backendService.putPostsFavoritesPostId(post_id).subscribe(
      response => {
        this.getMyPosts();
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("El post ya tiene tu like.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
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
}
