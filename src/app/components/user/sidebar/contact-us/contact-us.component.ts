import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';
import { ErrorService } from '../../../../services/error/error.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  tipo = '';
  titulo = '';
  descripcion = '';


  constructor(private router: Router, private location: Location, private backendService: BackendService, private errorService: ErrorService) {
    if (this.backendService.cookie.esInvitado) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 4;
    this.colspan = (window.innerWidth <= 1200) ? 1 : 3;
    this.rowHeight = (window.innerWidth <= 1200) ? "8:1" : "2:1";
  }

  goBack(): void {
    this.location.back();
  }

  enviarFormulario(): void {
    if (!this.tipo.trim() || !this.titulo.trim() || !this.descripcion.trim()) {
      this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
    } else {
      const body = {
        autor: this.backendService.cookie.usuario,
        tipo: this.tipo,
        titulo: this.titulo,
        descripcion: this.descripcion
      }

      console.log(body); // DELETE:

      this.backendService.postContactUs(body).subscribe(
        response => {
          console.log('Sugerencia creada correctamente: ', response); // LOG:
          this.tipo = this.titulo = this.descripcion = '';
        },
        error => {
          console.error('Error: ', error); // LOG:
          if (error.status === 400) {
            this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
          } else if (error.status === 401) {
            this.errorService.redirect("home");
          } else if (error.status === 500) {
            this.errorService.openDialogError("Se ha producido un error en el servidor, por favor intentelo de nuevo más tarde.");
          }
        }
      );
    }
  }

  // NOTE: RESPONSIVE

  numCols: number = 2;
  colspan: number = 3;
  rowHeight: string = "2:1"

  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 4;
    this.colspan = (event.target.innerWidth <= 1200) ? 1 : 3;
    this.rowHeight = (event.target.innerWidth <= 1200) ? "8:1" : "2:1";
  }
}
