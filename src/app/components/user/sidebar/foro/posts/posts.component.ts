import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnadirPostComponent } from '../anadir-post/anadir-post.component';
import { BackendService } from '../../../../../services/backend/backend.service';
import { ErrorService } from '../../../../../services/error/error.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  postsGeneral: any[] = [];
  private todosPosts: any[] = [];
  private respuesta: any[] = [];
  value: string = '';
  categoria: string = 'Compañero de piso';

  setCategoria(value: string) {
    this.categoria = value
  }

  navLinks = [
    { path: "piso", label: "Compañero de piso" },
    { path: 'recetas', label: "Recetas" },
    { path: 'economia', label: "Economía doméstica" },
    { path: 'limpieza', label: "Limpieza" },
    { path: 'otros', label: "Otros" },
    { path: 'guardados', label: "Guardados" }
  ];

  constructor(public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.backendService.getPosts().subscribe(
      response => {
        this.respuesta = response.respuesta.posts
        // console.log('Posts (Foro): ', this.respuesta); // LOG:
        this.formatear();
        this.postsGeneral = this.todosPosts;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  buscar(): void {
    if(!this.value.trim()){
      this.postsGeneral = this.todosPosts
    } else {
      this.value = this.value.toLowerCase();
      this.postsGeneral = this.todosPosts.filter(item =>
        item.title.toLowerCase().includes(this.value) || item.description.toLowerCase().includes(this.value)
      );
    }
    // console.log(this.postsGeneral) // LOG:
  }

  private formatear(): void {
    this.todosPosts = []
    for (const item of this.respuesta) {
      var data = {
        userName: item.autor,
        title: item.titulo,
        description: item.descripcion,
        categoria: item.categoria,
      }

      // console.log(data); // LOG:
      this.todosPosts.push(data);
    }
    this.todosPosts = this.todosPosts.reverse()
    // console.log('TodosPosts: ', this.todosPosts) // LOG:
  }

  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string, categoria: string): void {
    const dialog = this.dialog.open(AnadirPostComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { categoria: categoria }
    });

    dialog.afterClosed().subscribe(() => {
      this.ngOnInit(); // Llama a la función que deseas ejecutar cuando el modal se cierre
    });
  }
}
