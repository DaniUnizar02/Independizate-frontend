
/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de mostrar el mapa de geoserver con
 * sus diferentes marcadores.
 * 
 * Archivo: mapa.component.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  constructor(private location: Location) { }

  ngOnInit() {
    // NOTE: Responsive
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }

  goBack(): void {
    this.location.back();
  }

  // NOTE: RESPONSIVE
  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}
