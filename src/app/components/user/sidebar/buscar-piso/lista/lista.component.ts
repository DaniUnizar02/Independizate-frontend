import { Component } from '@angular/core';
import { BackendService } from '../../../../../services/backend/backend.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  tarjetas: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private backendService: BackendService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.backendService.getAparments().subscribe(
      response => {
        this.respuesta = response.apartments
        // console.log('Pisos: ', response.apartments); // LOG:
        this.formatear();
        this.tarjetas = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
      }
    );
  }

  formatear(): void {
    for (const item of this.respuesta) {
      var data = {
        piso: item.suggestedTexts.title,
        direccion: item.address,
        descripcion: item.description,
        precio: item.price
      }


      this.todos.push(data);
    }
    this.todos = this.todos.reverse()
  }
}
