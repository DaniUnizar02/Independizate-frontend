/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de manejar los diferentes tipos de mensajes
 * presentes en el foro.
 * 
 * Archivo: foro.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  constructor(private location: Location) { }

  /**
   * LA función `ngOnInit` ajusta el diseño según el ancho de la ventana.	
   */
  ngOnInit() {
    // NOTE: Resize
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }

  /**
   * La función `goBack` en TypeScript se utiliza para regresar a la ubicación anterior en el historial
   * del navegador.
   */
  goBack(): void {
    this.location.back();
  }

  //NOTE: RESPONSIVE

  rowHeightTit: string = '2:1'

  /**
   * La función `onResize` en TypeScript se utiliza para ajustar el diseño según el ancho de la ventana.
   * @param event 
   */
  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}

