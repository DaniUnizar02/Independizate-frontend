import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForoComponent } from './foro.component';
import { CompaneroPisoComponent } from './companero-piso/companero-piso.component';
import { RecetasComponent } from './recetas/recetas.component';
import { EconomiaDomesticaComponent } from './economia-domestica/economia-domestica.component';
import { LimpiezaComponent } from './limpieza/limpieza.component';
import { OtrosComponent } from './otros/otros.component';
import { GuardadosComponent } from './guardados/guardados.component';
import { ConversacionComponent } from './conversacion/conversacion.component';

const routes: Routes = [
  { path: '', component: ForoComponent, children: [
    { path: '', redirectTo: 'piso', pathMatch: 'full' },
    { path: 'piso', component: CompaneroPisoComponent },
    { path: 'recetas', component: RecetasComponent },
    { path: 'economia', component: EconomiaDomesticaComponent },
    { path: 'limpieza', component: LimpiezaComponent },
    { path: 'otros', component: OtrosComponent },
    { path: 'guardados', component: GuardadosComponent },
    { path: 'conversacion', component: ConversacionComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForoRoutingModule { }
