import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}

