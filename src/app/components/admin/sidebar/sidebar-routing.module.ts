import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, children: [
    { path: '', redirectTo: 'foro', pathMatch: 'full' },
    // { path: 'notificaciones', component: NotificacionesComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
