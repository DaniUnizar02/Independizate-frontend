/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar la información de contacto. 
 * 
 * Archivo: contact-us.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
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
    var cockie = this.backendService.getCookie();
    var dataCockie = false;
    if (cockie) {
      dataCockie = cockie.esInvitado;
    }
    if (dataCockie) {
      router.navigate(['home']);
    }
  }

  /**
   * La función `ngOnInit` ajusta el diseño según el ancho de la ventana para mejorar la capacidad de
   * respuesta.
   */
  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 4;
    this.colspan = (window.innerWidth <= 1200) ? 1 : 3;
    this.rowHeight = (window.innerWidth <= 1200) ? "8:1" : "2:1";
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }
  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * La función `enviarFormulario` se utiliza para enviar el formulario de contacto al
   * backend, maneja diferentes estados de error y procesa los datos de respuesta.
   */
  enviarFormulario(): void {
    if (!this.tipo.trim() || !this.titulo.trim() || !this.descripcion.trim()) {
      this.errorService.openDialogError("Todos los campos tienen que estar rellenos.");
    } else {
      var cockie = this.backendService.getCookie();
      var dataCockie = '';
      if (cockie) {
        dataCockie = cockie.usuario;
      }
      const body = {
        autor: dataCockie,
        tipo: this.tipo,
        titulo: this.titulo,
        descripcion: this.descripcion
      }


      this.backendService.postContactUs(body).subscribe(
        response => {
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
  rowHeightTit: string = '2:1'

  /**
   * La función `onResize` se ejecuta al redimensionar
   * la ventana del navegador para ajustar el número de columnas y la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 4;
    this.colspan = (event.target.innerWidth <= 1200) ? 1 : 3;
    this.rowHeight = (event.target.innerWidth <= 1200) ? "8:1" : "2:1";
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
