/**
 * Proyecto: Independizate
 * Descripción: Fichero con el módulo de buscar piso.
 * 
 * Archivo: buscar-piso.module.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscarPisoRoutingModule } from './buscar-piso-routing.module';
import { BuscarPisoComponent } from './buscar-piso.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListaComponent } from './lista/lista.component';
import { MapaComponent } from './mapa/mapa.component';
import { FiltrosComponent } from './filtros/filtros.component';


@NgModule({
  declarations: [
    BuscarPisoComponent,
    ListaComponent,
    MapaComponent,
    FiltrosComponent,
  ],
  imports: [
    CommonModule,
    BuscarPisoRoutingModule,
    SharedModule
  ]
})
export class BuscarPisoModule { }
