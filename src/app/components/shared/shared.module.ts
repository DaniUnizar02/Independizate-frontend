/**
 * Proyecto: Independizate
 * Descripción: Fichero con el modulo de diferentes elementos
 * compartidos en el código. 
 * 
 * Archivo: shared.module.ts
 * 
 * Autores: 
 *  - Daniel Carrizo
 *  - Juan Pellicer
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { ReactiveFormsModule } from '@angular/forms';

// Angular Materials
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';

// Charts
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSlideToggleModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  exports: [
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSlideToggleModule,
    NgApexchartsModule
  ]
})
export class SharedModule { }
