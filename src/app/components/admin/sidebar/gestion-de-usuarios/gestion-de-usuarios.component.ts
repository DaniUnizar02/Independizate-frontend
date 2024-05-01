import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrl: './gestion-de-usuarios.component.css'
})
export class GestionDeUsuariosComponent {
  value: string = '';
  users= [
    {usuario: 'Juan', correo: 'correo@c.es', reputacion: '5', edad: '25', denuncias: '0', post: '3', estado: 'Activo'},
    {usuario: 'Pepe', correo: 'correo2@c.es', reputacion: '4', edad: '30', denuncias: '0', post: '4', estado: 'Activo'},
    {usuario: 'Maria', correo: 'correo3@c.es', reputacion: '3', edad: '35', denuncias: '0', post: '2', estado: 'Activo'},
    {usuario: 'Ana', correo: 'correo4@c.es', reputacion: '2', edad: '40', denuncias: '1', post: '5', estado: 'Activo'},
    {usuario: 'Pedro', correo: 'correo5@c.es', reputacion: '1', edad: '45', denuncias: '0', post: '3', estado: 'Activo'},
  ]; 

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
