/**
 * Proyecto: Independizate
 * Descripción: Fichero con el módulo del perfil de usuario.
 * 
 * Archivo: perfil.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from '../../../shared/shared.module';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    PerfilComponent,
    DatosPersonalesComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule
  ]
})
export class PerfilModule { }
