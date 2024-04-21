import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  imports: [NgbDropdownModule],
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

}
