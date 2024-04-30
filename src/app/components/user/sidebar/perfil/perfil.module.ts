import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from '../../../shared/shared.module';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { DatosPersonalesEditarComponent } from './datos-personales-editar/datos-personales-editar.component';


@NgModule({
  declarations: [
    PerfilComponent,
    DatosPersonalesComponent,
    EstadisticasComponent,
    DatosPersonalesEditarComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule
  ]
})
export class PerfilModule { }
