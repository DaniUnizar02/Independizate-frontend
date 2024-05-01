import { Component, Inject } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';
import { PostsComponent } from '../posts/posts.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-anadir-post',
  templateUrl: './anadir-post.component.html',
  styleUrl: './anadir-post.component.css'
})
export class AnadirPostComponent {
  titulo: string = '';
  mensaje: string = '';
  body = {
    titulo: '',
    descripcion: '',
    autor: '',
    categoria: ''
  }
  private categoria: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AnadirPostComponent>, private backendService: BackendService) {
    this.categoria = data.categoria;
    // console.log(this.categoria) // LOG:
  }

  anadir() {
    if (!this.titulo.trim() && !this.mensaje.trim()) {
      console.log('No hay datos para añdir el post'); // LOG:
    } else {
      this.body = {
        titulo: this.titulo,
        descripcion: this.mensaje,
        autor: "66112f4407b01332ba5983bc", // TODO: Este usuario es por defecto, realmente hay que sacarlo de algún lado
        categoria: this.categoria
      }
      this.backendService.postPosts(this.body).subscribe(
        response => {
          // this.respuesta = response.respuesta.posts
          // // console.log('Posts (Foro): ', this.respuesta); // LOG:
          // this.formatear();
          // this.postsGeneral = this.todosPosts
        },
        error => {
          console.error('Error: ', error);
        }
      );
      this.dialogRef.close();
    }
  }
}
