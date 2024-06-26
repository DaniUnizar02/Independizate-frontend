/**
 * Proyecto: Independizate
 * Descripción: Fichero de enrutamiento del sidebar (usuario).
 * 
 * Archivo: sidebar-routing.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { FaqComponent } from './faq/faq.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { InfoPisoComponent } from './info-piso/info-piso.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, children: [
    { path: '', redirectTo: 'foro', pathMatch: 'full' },
    { path: 'notificaciones', component: NotificacionesComponent },
    { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then( x => x.PerfilModule )},
    { path: 'piso', loadChildren: () => import('./buscar-piso/buscar-piso.module').then( x => x.BuscarPisoModule )},
    { path: 'info-piso/:id', component: InfoPisoComponent },
    { path: 'foro', loadChildren: () => import('./foro/foro.module').then( x => x.ForoModule )},
    { path: 'mapa', component: MapaComponent},
    { path: 'faq', component: FaqComponent },
    { path: 'contact-us', component: ContactUsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
