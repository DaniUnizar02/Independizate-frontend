/**
 * Proyecto: Independizate
 * Descripción: Fichero encargado del routing de contact us de usuario.
 * 
 * Archivo: contact-us-de-usuario-routing.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsDeUsuarioComponent } from './contact-us.component';


const routes: Routes = [
  { path: '', component: ContactUsDeUsuarioComponent, children: [
    { path: '', redirectTo: 'dropdown', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContacUsDeUsuarioRoutingModule { }
