import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';

@Component({
  selector: 'app-contact-us-de-usuario',
  templateUrl: './contact-us-de-usuario.component.html',
  styleUrl: './contact-us-de-usuario.component.css'
})
export class ContactUsDeUsuarioComponent {
  tipo = 'todos';
  contacts: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getContactUs().subscribe(
      response => {
        this.respuesta = response.sugerencias
        console.log('Sugerencias o Quejas de usuario: ', response.sugerencias); // LOG:
        this.formatear();
        this.contacts = this.todos;
        this.filtrar();
      },
      error => {
        console.error('Error al crear la sugerencia: ', error); // LOG:
      }
    );
  }

  filtrar(): void {
    if (!this.tipo.trim()) {
      this.contacts = this.todos
    } else {
      if (this.tipo == 'todos') {
        this.contacts = this.todos
      } else {
        this.tipo = this.tipo.toLowerCase();
        this.contacts = this.todos.filter(item =>
          item.tipo.toLowerCase().includes(this.tipo)
        );
      }
    }
  }

  private formatear(): void {
    this.todos = []
    for (const item of this.respuesta) {
      var data = {
        usuario: item.autor,
        tipo: item.tipo,
        info: item.descripcion,
      }

      this.todos.push(data);
    }
    this.todos = this.todos.reverse()
  }

  goBack(): void {
    this.location.back();
  }
}
