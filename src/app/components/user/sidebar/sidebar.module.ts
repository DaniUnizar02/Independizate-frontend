import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { ForoComponent } from './foro/foro.component';
import { SharedModule } from '../../shared/shared.module';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MapaComponent } from './mapa/mapa.component';
import { InfoPisoComponent } from './info-piso/info-piso.component';
import { VerNotificacionComponent } from './notificaciones/ver-notificacion/ver-notificacion.component';

@NgModule({
  declarations: [
    ForoComponent,
    FaqComponent,
    ContactUsComponent,
    NotificacionesComponent,
    MapaComponent,
    InfoPisoComponent,
    VerNotificacionComponent,
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule,
  ]
})
export class SidebarModule { }
