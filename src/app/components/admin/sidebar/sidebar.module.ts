import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponentAdmin } from './sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { GestionDeUsuariosComponent } from './gestion-de-usuarios/gestion-de-usuarios.component';
import { DenunciasDelForoComponent } from './denuncias-del-foro/denuncias-del-foro.component';
import { ContactUsDeUsuarioComponent } from './contact-us-de-usuario/contact-us-de-usuario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EstadoUsuarioComponent } from './gestion-de-usuarios/estado-usuario/estado-usuario.component';
import { ResponderSugerenciaComponent } from './contact-us-de-usuario/responder-sugerencia/responder-sugerencia.component';
import { MasDetallesComponent } from './denuncias-del-foro/mas-detalles/mas-detalles.component';


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
