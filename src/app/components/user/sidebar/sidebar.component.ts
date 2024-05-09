import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  open: boolean = true;
  margen: Number = 15;
  nombreUsuario: string;

  constructor (private backendService: BackendService) {
    this.nombreUsuario = backendService.nombreUsuario;
  }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.margen = 15;
    } else {
      this.margen = 5;
    }
  }
}
