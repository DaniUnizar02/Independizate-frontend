import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponentAdmin } from './sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { GestionDeUsuariosComponent } from './gestion-de-usuarios/gestion-de-usuarios.component';
import { DenunciasDelForoComponent } from './denuncias-del-foro/denuncias-del-foro.component';
import { ContactUsDeUsuarioComponent } from './contact-us-de-usuario/contact-us-de-usuario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    SidebarComponentAdmin,
    GestionDeUsuariosComponent,
    DenunciasDelForoComponent,
    ContactUsDeUsuarioComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule
  ]
})
export class SidebarModule { }
