/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de gestionar los mensajes de contacto con
 * administración de los usuarios.
 * 
 * Archivo: contact-us.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ResponderSugerenciaComponent } from './responder/responder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsDeUsuarioComponent {
  tipo = 'todos';
  contacts: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (window.innerWidth <= 1200) ? '1:2' : '2:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getContact();
  }

  getContact() {
    this.backendService.getAdminSuggestions().subscribe(
      response => {
        this.respuesta = response
        console.log('Sugerencias o Quejas de usuario: ', response.sugerencias); // LOG:
        this.formatear();
        this.contacts = this.todos;
        this.filtrar();
      },
      error => {
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se han encontrado quejas/sugerencias.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  filtrar(): void {
    if (!this.tipo.trim()) {
      this.contacts = this.todos
    } else {
      if (this.tipo == 'todos') {
        this.contacts = this.todos
      } else {
        this.tipo = this.tipo.toLowerCase();
        this.contacts = this.todos.filter(item =>
          item.tipo.toLowerCase().includes(this.tipo)
        );
      }
    }
  }

  private formatear(): void {
    this.todos = []
    for (const item of this.respuesta) {
      if (!item.completada) {
        var data = {
          id: item._id,
          foto: item.profilePhoto, // TODO: Pedirle a backedn que me lo devuelva
          username: item.username,  //TODO: Pedirle a backend que me lo devuelva
          usuario: item.autor,
          tipo: item.tipo,
          info: item.descripcion,
          titulo: item.titulo
        }
        console.log(data) //LOG:
        this.todos.push(data);
      }
    }
    this.todos = this.todos.reverse()
  }

  goBack(): void {
    this.location.back();
  }

  rechazar(id: string) {
    this.backendService.putAdminSuggestionsRejectId(id).subscribe(
      response => {
        this.getContact();
      },
      error => {
        if (error.status === 400) {
          this.errorService.openDialogError("Parámetros inválidos.");
        } else if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("No se ha encontrado la sugerencia/queja indicada.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  openDialogResponderSugerencia(enterAnimationDuration: string, exitAnimationDuration: string, id: string, tipo: string, info: string): void {
    const dialog = this.dialog.open(ResponderSugerenciaComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { 
        id: id,
        tipo: tipo,
        info: info
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getContact();
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

  // NOTE: RESPONSIVE

  numCols: number = 2;
  rowHeight: string = '2.5:1'
  rowHeightBusc: string = '2:1'
  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightBusc = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
