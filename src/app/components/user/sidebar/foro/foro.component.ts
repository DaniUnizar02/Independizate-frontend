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

  goBack(): void {
    this.location.back();
  }
}

