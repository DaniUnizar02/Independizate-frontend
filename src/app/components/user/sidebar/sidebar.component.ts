import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  open: boolean = true;
  margen: Number = 15;

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.margen = 15;
    } else {
      this.margen = 5;
    }
  }
}
