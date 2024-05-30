/**
 * Proyecto: Independizate
 * Descripción: Módulo del componente sidebar.
 * 
 * Archivo: sidebar.module.ts 
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponentAdmin } from './sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { GestionDeUsuariosComponent } from './gestion-de-usuarios/gestion-de-usuarios.component';
import { DenunciasDelForoComponent } from './denuncias-del-foro/denuncias-del-foro.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EstadoUsuarioComponent } from './gestion-de-usuarios/estado-usuario/estado-usuario.component';
import { MasDetallesComponent } from './denuncias-del-foro/mas-detalles/mas-detalles.component';
import { ContactUsDeUsuarioComponent } from './contact-us/contact-us.component';
import { ResponderSugerenciaComponent } from './contact-us/responder/responder.component';


@NgModule({
  declarations: [
    SidebarComponentAdmin,
    GestionDeUsuariosComponent,
    DenunciasDelForoComponent,
    ContactUsDeUsuarioComponent,
    EstadisticasComponent,
    EstadoUsuarioComponent,
    ResponderSugerenciaComponent,
    MasDetallesComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule
  ]
})
export class SidebarModule { }
