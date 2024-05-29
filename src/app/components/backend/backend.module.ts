/**
 * Proyecto: Independizate
 * Descripción: Fichero de modulo para las interacciones con el backend.
 * 
 * Archivo: backend.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackendService } from '../../services/backend/backend.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [BackendService]
})
export class BackendModule { }
