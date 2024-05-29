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

  ngOnInit() {
    // NOTE: Resize
    this.rowHeightTit = (window.innerWidth <= 1200) ? '1:2' : '2:1';
  }

  goBack(): void {
    this.location.back();
  }

  //NOTE: RESPONSIVE

  rowHeightTit: string = '2:1'

  onResize(event: any) {
    this.rowHeightTit = (event.target.innerWidth <= 1200) ? '1:2' : '1:1';
  }
}

