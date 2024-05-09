import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { CompaneroPisoComponent } from './posts/companero-piso/companero-piso.component';
import { RecetasComponent } from './posts/recetas/recetas.component';
import { EconomiaDomesticaComponent } from './posts/economia-domestica/economia-domestica.component';
import { LimpiezaComponent } from './posts/limpieza/limpieza.component';
import { OtrosComponent } from './posts/otros/otros.component';
import { GuardadosComponent } from './posts/guardados/guardados.component';
import { SharedModule } from '../../../shared/shared.module';
import { ConversacionComponent } from './conversacion/conversacion.component';
import { VerUsuarioComponent } from './conversacion/ver-usuario/ver-usuario.component';
import { PonerDenunciaComponent } from './poner-denuncia/poner-denuncia.component';
import { AnadirPostComponent } from './anadir-post/anadir-post.component';
import { AnadirConversacionComponent } from './conversacion/anadir-conversacion/anadir-conversacion.component';
import { ResponderMensajeComponent } from './conversacion/responder-mensaje/responder-mensaje.component';


@NgModule({
  declarations: [
    CompaneroPisoComponent,
    RecetasComponent,
    EconomiaDomesticaComponent,
    LimpiezaComponent,
    OtrosComponent,
    GuardadosComponent,
    ConversacionComponent,
    VerUsuarioComponent,
    PonerDenunciaComponent,
    AnadirPostComponent,
    AnadirConversacionComponent,
    ResponderMensajeComponent,
  ],
  imports: [
    CommonModule,
    ForoRoutingModule,
    SharedModule,
  ]
})
export class ForoModule { }
