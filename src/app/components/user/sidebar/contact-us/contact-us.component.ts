import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
