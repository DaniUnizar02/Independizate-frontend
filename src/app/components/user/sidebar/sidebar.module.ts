import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { ForoComponent } from './foro/foro.component';
import { SharedModule } from '../../shared/shared.module';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MapaComponent } from './mapa/mapa.component';


@NgModule({
  declarations: [
    ForoComponent,
    FaqComponent,
    ContactUsComponent,
    NotificacionesComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule,
  ]
})
export class SidebarModule { }
