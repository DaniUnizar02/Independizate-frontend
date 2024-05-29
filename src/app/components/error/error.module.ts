/**
 * Proyecto: Independizate
 * Descripción: Fichero que sirve como base para mensajes de error.
 * 
 * Archivo: error.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error/error.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ErrorService]
})
export class ErrorModule { }
