import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: PerfilComponent, children: [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    { path: 'info', component: DatosPersonalesComponent },
    { path: 'estadisticas', component: EstadisticasComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
