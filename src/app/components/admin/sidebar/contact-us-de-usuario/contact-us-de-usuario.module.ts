import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ContacUsDeUsuarioRoutingModule } from './contact-us-de-usuario-routing.module';



@NgModule({
  declarations: [
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ContacUsDeUsuarioRoutingModule
  ]
})
export class ContactUsDeUsuarioModule { }
