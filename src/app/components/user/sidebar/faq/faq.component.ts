import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
