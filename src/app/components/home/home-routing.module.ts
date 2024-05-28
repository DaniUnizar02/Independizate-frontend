/**
 * Proyecto: Independizate
 * Descripción: Fichero de enrutamiento del componente home.
 * 
 * Archivo: home-routing.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from '../user/sidebar/sidebar.component';
import { SidebarComponentAdmin } from '../admin/sidebar/sidebar.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sidebar', component: SidebarComponent },
    { path: 'sidebarAdmin', component: SidebarComponentAdmin }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}