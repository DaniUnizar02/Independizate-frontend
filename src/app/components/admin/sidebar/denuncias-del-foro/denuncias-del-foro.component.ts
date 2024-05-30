/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de gestionar las denuncias del foro.
 * 
 * Archivo: denuncias-del-foro.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { MasDetallesComponent } from './mas-detalles/mas-detalles.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-denuncias-del-foro',
  templateUrl: './denuncias-del-foro.component.html',
  styleUrl: './denuncias-del-foro.component.css'
})
export class DenunciasDelForoComponent {
  denuncias: any[] = [];
  private respuesta: any[] = [];
  private todos: any[] = [];

  constructor(private location: Location, public dialog: MatDialog, private backendService: BackendService, private errorService: ErrorService) {
    console.log(this.backendService.cookie.token); //LOG:
  }

  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';

    this.getDenuncias();
  }

  getDenuncias() {
    this.todos = [];
    this.backendService.getAdminReports().subscribe(
      response => {
        console.log(response.reports); //LOG:
        this.respuesta = response.reports;
        this.formatear();
        this.denuncias = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  formatear() {
    for (const item of this.respuesta) {
      if (!item.completada) {
        var data = {
          id: item._id,
          tipo: item.tipo,
          foto: "data:image/png;base64," + item.fotoPerfil, // TODO: Pedirle a backedn que me lo devuelva
          username: item.usuario,  //TODO: Pedirle a backend que me lo devuelva
          descripcion: item.descripcion,
          referencia: item.referencia,
          autor: item.autor,
          respuesta: item.reespuesta
        }
  
        this.todos.push(data);
      }
    }
    this.todos = this.todos.reverse()
  }

  rechazar(referencia: string) {
    this.backendService.putApiAdminReportRejectId(referencia).subscribe(
      response => {
        this.getDenuncias();
      },
      error => {
        console.error('Error: ', error); // LOG:
        if (error.status === 401) {
          this.errorService.redirect("home");
        } else if (error.status === 403) {
          this.errorService.openDialogErrorRedirect("No tienes permisos para realizar esta acción.", "home");
        } else if (error.status === 404) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  openDialogMasDestalles(enterAnimationDuration: string, exitAnimationDuration: string, id: string, tipo: string, info: string, referencia: string): void {
    const dialog = this.dialog.open(MasDetallesComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { 
        id: id,
        tipo: tipo,
        info: info,
        referencia: referencia
      }
    });

    dialog.afterClosed().subscribe(() => {
      this.getDenuncias();
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
  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
