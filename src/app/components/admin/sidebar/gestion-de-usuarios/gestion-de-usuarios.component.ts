import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoUsuarioComponent } from './estado-usuario/estado-usuario.component';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrl: './gestion-de-usuarios.component.css'
})
export class GestionDeUsuariosComponent {
  value: string = '';
  users: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) { }

  ngOnInit(): void {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getUsuarios();
  }

  getUsuarios() {
    this.backendService.getUsers().subscribe(
      response => {
        this.respuesta = response.users
        console.log('Usuarios: ', this.respuesta); // LOG:
        this.formatear();
        this.users = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 400) {
          this.errorService.openDialogError("Error 401: Acceso no autorizado. El token proporcionado no es válido.");
        } else if (error.status === 401) {
          this.errorService.openDialogError("");
        } else if (error.status === 403) {
          this.errorService.openDialogError("No se encontraron posts.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  buscar(): void {
    if (!this.value.trim()) {
      this.users = this.todos
    } else {
      this.value = this.value.toLowerCase();
      this.users = this.todos.filter(item =>
        item.usuario.toLowerCase().includes(this.value)
      );
    }
  }

  private formatear(): void {
    this.todos = []
    for (const item of this.respuesta) {
      var data = {
        id: item._id,
        usuario: item.nombre,
        correo: item.correo,
        reputacion: item.reputacion,
        edad: item.edad,
        denuncias: item.denuncias,
        post: item.publicaciones,
        estado: item.activo
      }

      data.estado = item.bloqueado ? 'Activo' : 'Bloqueado';

      // console.log(data); // LOG:
      this.todos.push(data);
    }
    this.todos = this.todos.reverse()
  }

  openDialogEstadoUsuario(enterAnimationDuration: string, exitAnimationDuration: string, id: string, estado: string): void {
    const dialog = this.dialog.open(EstadoUsuarioComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        estado: estado
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getUsuarios();
    });
  }

  goBack(): void {
    this.location.back();
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

  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
