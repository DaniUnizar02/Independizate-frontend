/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar la lista de pisos. 
 * 
 * Archivo: lista.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { BuscarPisoComponent } from '../buscar-piso.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  tarjetas: any[] = [];
  
  constructor(private router: Router, private buscarPisoComponent: BuscarPisoComponent) { }

  /**
   * La función ngOnInit se encarga de ajustar el número de columnas y la altura de las filas
   * en función del tamaño de la ventana del navegador.
   */
  ngOnInit() {
    // NOTE: Responsive
    this.numCols = (window.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (window.innerWidth <= 1200) ? '2:1' : '2.5:1';
  }

  ngDoCheck() {
    this.tarjetas = this.buscarPisoComponent.tarjetas;
  }

  // NOTE: Info piso

  /**
   * Función que navega a la página de información del piso id.
   * @param id 
   */
  navigateToInfoPiso(id: string) {
    this.router.navigate(['sidebar','info-piso', id]);
  }

  // NOTE: Paginator

  pageIndex: number = 0;
  pageSize: number = 10;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  /**
   * Función que actualiza los datos del paginador.
   * @param event 
   */
  getPaginatorData(event: { pageIndex: number; }) {
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

  /**
   * Función que se ejecuta al redimensionar la ventana del navegador para ajustar el número de columnas y la altura de las filas.
   * @param event 
   */
  onResize(event: any) {
    this.numCols = (event.target.innerWidth <= 1200) ? 1 : 2;
    this.rowHeight = (event.target.innerWidth <= 1200) ? '2:1' : '2.5:1';
  }
}
