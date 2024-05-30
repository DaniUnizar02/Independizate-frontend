/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado de gestionar los filtros,
 * actualmente no esta siendo empleado. 
 * 
 * Archivo: filtros.component.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  constructor(private _formBuilder: FormBuilder) {}

  /**
   * Función en desuso.
   */
  filtrar() {}
}
