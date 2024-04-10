import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPisoComponent } from './buscar-piso.component';
import { ListaComponent } from './lista/lista.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: BuscarPisoComponent, children: [
    { path: '', redirectTo: 'lista', pathMatch: 'full' },
    { path: 'lista', component: ListaComponent },
    { path: 'mapa', component: MapaComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarPisoRoutingModule { }
