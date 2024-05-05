import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponentAdmin } from './sidebar.component';
import { GestionDeUsuariosComponent } from './gestion-de-usuarios/gestion-de-usuarios.component';
import { DenunciasDelForoComponent } from './denuncias-del-foro/denuncias-del-foro.component';
import { ContactUsDeUsuarioComponent } from './contact-us-de-usuario/contact-us-de-usuario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: SidebarComponentAdmin, children: [
    { path: '', redirectTo: 'gestion-de-usuarios', pathMatch: 'full' },
    //{ path: 'gestion-de-usuarios', loadChildren: () => import('./gestion-de-usuarios/gestion-de-usuarios.module').then( x => x.GestionDeUsuariosModule )},
    { path: 'gestion-de-usuarios', component: GestionDeUsuariosComponent},
    { path: 'denuncias-del-foro', component: DenunciasDelForoComponent},
    { path: 'contact-us-de-usuario', component: ContactUsDeUsuarioComponent},
    { path: 'estadisticas', component: EstadisticasComponent},
    // { path: 'notificaciones', component: NotificacionesComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
