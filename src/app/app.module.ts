/**
 * Proyecto: Independizate
 * Descripción: Fichero con el módulo principal de la aplicación.
 * 
 * Archivo: app.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Angular Materials
import { SharedModule } from './components/shared/shared.module';

// Componentes
import { SidebarComponent } from './components/user/sidebar/sidebar.component';
import { BackendModule } from './components/backend/backend.module';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { WsComponent } from './components/ws/ws/ws.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ErrorComponent,
    HomeComponent,
    WsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule, // Angular materials
    BackendModule // Backend
  ],
  providers: [
    provideAnimationsAsync(),
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
