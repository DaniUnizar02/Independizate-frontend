import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa.component';

const routes: Routes = [
  { path: '', component: MapaComponent, children: [
    { path: '', redirectTo: 'busqueda', pathMatch: 'full' },
    // { path: 'busqueda', component: CompaneroPisoComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaRoutingModule { }
