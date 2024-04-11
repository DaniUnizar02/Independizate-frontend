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
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

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
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
  ],
  exports: [
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
