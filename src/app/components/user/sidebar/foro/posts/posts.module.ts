/**
 * Proyecto: Independizate
 * Descripción: Fichero con el módulo de los mensajes del foro.
 * 
 * Archivo: posts.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    MatGridListModule
  ]
})
export class PostsModule { }
