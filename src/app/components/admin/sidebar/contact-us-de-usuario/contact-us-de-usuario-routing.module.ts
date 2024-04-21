import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsDeUsuarioComponent } from './contact-us-de-usuario.component';
import { DropdownComponent } from './dropdown/dropdown.component';


const routes: Routes = [
  { path: '', component: ContactUsDeUsuarioComponent, children: [
    { path: '', redirectTo: 'dropdown', pathMatch: 'full' },
    { path: 'dropdown', component: DropdownComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContacUsDeUsuarioRoutingModule { }
