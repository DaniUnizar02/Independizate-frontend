import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then( x => x.HomeModule)},
  { path: 'sidebar', loadChildren: () => import('./components/user/sidebar/sidebar.module').then( x => x.SidebarModule)},
  

  /* -- Rutas para el admin -- */
  { path: 'admin', children: [
    { path: 'sidebar', loadChildren: () => import('./components/admin/sidebar/sidebar.module').then( x => x.SidebarModule)},
    { path: '**', redirectTo: 'sidebar', pathMatch: 'full'}
  ]},
  /* ------------------------- */
  
  { path: '**', redirectTo: 'home', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
