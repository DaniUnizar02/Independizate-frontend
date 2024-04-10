import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sidebar', pathMatch: 'full' },
  // { path: 'sidebar', component: SidebarComponent },
  { path: 'sidebar', loadChildren: () => import('./components/user/sidebar/sidebar.module').then( x => x.SidebarModule)},
  // { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then( x => x.DashboardModule)},
  { path: '**', redirectTo: 'sidebar', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
