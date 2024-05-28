import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { ResponderSugerenciaComponent } from './responder-sugerencia/responder-sugerencia.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us-de-usuario',
  templateUrl: './contact-us-de-usuario.component.html',
  styleUrl: './contact-us-de-usuario.component.css'
})
export class ContactUsDeUsuarioComponent {
  tipo = 'todos';
  contacts: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit() {
    this.getContact();
  }

  getContact() {
    this.backendService.getContactUs().subscribe(
      response => {
        this.respuesta = response.sugerencias
        console.log('Sugerencias o Quejas de usuario: ', response.sugerencias); // LOG:
        this.formatear();
        this.contacts = this.todos;
        this.filtrar();
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("No se encontraron usuarios.");
        } else if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Error 403: El token no es válido.");
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
          foto: '', // TODO: Pedirle a backedn que me lo devuelva
          username: '',  //TODO: Pedirle a backend que me lo devuelva
          usuario: item.autor,
          tipo: item.tipo,
          info: item.descripcion,
          titulo: item.titulo
        }

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
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("No se encontraron usuarios.");
        } else if (error.status === 401) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado.");
        } else if (error.status === 403) {
          this.errorService.openDialogError("Error 403: El token no es válido.");
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
}
