import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrl: './ws.component.css'
})
export class WsComponent {
  mensaje: string; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
    this.mensaje = data;
  }

  
}
