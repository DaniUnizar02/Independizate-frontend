/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar más detalles de una denuncia.
 * 
 * Archivo: mas-detalles.component.ts
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
  selector: 'app-mas-detalles',
  templateUrl: './mas-detalles.component.html',
  styleUrl: './mas-detalles.component.css'
})
export class MasDetallesComponent {
  cambiarForo = false;
  esEliminar: boolean;

  private id: string;
  tipo: string;
  info: string;
  post = {
    title: '',
    description: '',
  };
  private referencia: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MasDetallesComponent>, private backendService: BackendService, private errorService: ErrorService) {
    this.id = data.id;
    this.tipo = data.tipo;
    this.info = data.info;
    this.referencia = data.referencia;

    this.esEliminar = (this.tipo=="Post foro erroneo") ? false : true;
  }

  ngOnInit() {
    this.cambiarForo = false;

    this.backendService.getPostsId(this.referencia).subscribe(
      response => {
        console.log("POST: ", response); //LOG:
        this.post = {
          title: response.titulo,
          description: response.descripcion
        }
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("No se ha encontrado el post indicado.");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se ha encontrado el post indicado.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  accion(accion: string) {
    var body = {
      respuesta: ' '
    }

    if (accion==' '){
      body = {
        respuesta: 'Post/Mensaje eliminado.'
      }
    } else {
      var body = {
        respuesta: 'Post cambiado al foro solicitado.'
      }
    }

    console.log(this.id); //LOG:
        
    this.backendService.putAdminAcceptReportIdCategoria(this.id, accion, body).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se ha encontrado la denuncia indicada.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }
}
