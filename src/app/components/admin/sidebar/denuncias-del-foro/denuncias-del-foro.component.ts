import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';

@Component({
  selector: 'app-denuncias-del-foro',
  templateUrl: './denuncias-del-foro.component.html',
  styleUrl: './denuncias-del-foro.component.css'
})
export class DenunciasDelForoComponent {
  denuncias: any[] = [];
  private respuesta: any[] = [];
  private todos: any[] = [];

  constructor(private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    console.log(this.backendService.cookie.token); //LOG:
  }

  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';

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
        if (error.status === 404) {
          this.errorService.openDialogError("No se encontraron denuncias.");
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
        if (error.status === 404) {
          this.errorService.openDialogError("No se ha rechazado la denuncia.");
        } else if (error.status === 500) {
          this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  // NOTE: RESPONSIVE

  numCols: number = 2;
  rowHeight: string = '2.5:1'

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
  }
}
