import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

const routes: Routes = [
  { path: '', component: SidebarComponent, children: [
    { path: '', redirectTo: 'foro', pathMatch: 'full' },
    { path: 'foro', loadChildren: () => import('./foro/foro.module').then( x => x.ForoModule )},
    { path: 'buscar-piso', loadChildren: () => import('./buscar-piso/buscar-piso.module').then( x => x.BuscarPisoModule )}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
