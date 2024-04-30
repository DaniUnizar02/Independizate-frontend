import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  // preguntasFrecuentes =[
  //   {"titulo": "","descripcion": ""},
  // ]
  preguntasFrecuentes: any[] = [];
  
  constructor(private location: Location, private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getFaqs().subscribe(
      response => {
        this.preguntasFrecuentes = response.faqs
        console.log('FAQs: ', response.faqs);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
