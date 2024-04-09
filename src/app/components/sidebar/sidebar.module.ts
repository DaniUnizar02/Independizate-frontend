import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { ForoComponent } from './foro/foro.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ForoComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    SharedModule,
  ]
})
export class SidebarModule { }
