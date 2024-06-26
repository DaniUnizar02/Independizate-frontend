/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de la adición de un post al foro.
 * 
 * Archivo: anadir-post.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component, Inject } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from '../../../../../services/error/error.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AnadirPostComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.categoria = data.categoria;
  }

  /**
   * Función que añade un post al foro.
   */
  anadir() {
    if (!this.titulo.trim() || !this.mensaje.trim()) {
      this.errorService.openDialogError("Todos los campos deben estar rellenos.");
    } else {
      var cockie = this.backendService.getCookie();
      var dataCockie = '';
      if (cockie) {
        dataCockie = cockie.usuario;
      }
      this.body = {
        titulo: this.titulo,
        descripcion: this.mensaje,
        autor: dataCockie, 
        categoria: this.categoria
      }
      this.backendService.postPosts(this.body).subscribe(
        response => {
          this.dialogRef.close();
        },
        error => {
          if (error.status === 400) {
            this.errorService.openDialogError("Parámetros inválidos");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }
}
