/**
 * Proyecto: Independizate
 * Descripción: Fichero con el módulo de contact us de usuario.
 * 
 * Archivo: contact-us-de-usuario.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContacUsDeUsuarioRoutingModule } from './contact-us-de-usuario-routing.module';
import { ResponderSugerenciaComponent } from './responder-sugerencia/responder-sugerencia.component';



@NgModule({
  imports: [
    CommonModule,
    ContacUsDeUsuarioRoutingModule
  ]
})
export class ContactUsDeUsuarioModule { }
