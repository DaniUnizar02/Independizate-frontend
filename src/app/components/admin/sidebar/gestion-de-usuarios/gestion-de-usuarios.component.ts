import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../../../../services/backend/backend.service';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrl: './gestion-de-usuarios.component.css'
})
export class GestionDeUsuariosComponent {
  value: string = '';
  users: any[] = [];
  private todos: any[] = [];
  private respuesta: any[] = [];

  constructor(private location: Location, private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getUsers().subscribe(
      response => {
        this.respuesta = response.users
        console.log('Usuarios: ', this.respuesta); // LOG:
        this.formatear();
        this.users = this.todos;
      },
      error => {
        console.error('Error: ', error); // LOG:
      }
    );
  }

  buscar(): void {
    if(!this.value.trim()){
      this.users = this.todos
    } else {
      this.value = this.value.toLowerCase();
      this.users = this.todos.filter(item =>
        item.usuario.toLowerCase().includes(this.value)
      );
    }
  }

  private formatear(): void {
    this.todos = []
    for (const item of this.respuesta) {
      var data = {
        usuario: item.nombre,
        correo: item.correo,
        reputacion: item.reputacion,
        edad: item.edad,
        denuncias: item.denuncias,
        post: item.publicaciones,
        estado: item.activo
      }

      data.estado = data.estado ? 'Activo' : 'Bloqueado';

      // console.log(data); // LOG:
      this.todos.push(data);
    }
    this.todos = this.todos.reverse()
  }

  goBack(): void {
    this.location.back();
  }
}
