import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent {
  infoUsuario = {
    usuario: "nombreUsuario",
    nombre: "Nombre",
    apellidos: "apellido1 apellido2",
    edad: "20",
    reputacion: "256",
    correo: "ejemplo@ejemplo.es",
    sexo: "prefiero no decirlo",
    piso: true,
    ciudad: "Zaragoza",
    situacion: "estudiante",
    estampas: [
      {titulo: "estampa 1", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "Estampa no equipable", favorita: false, color: ''},
      {titulo: "estampa 2", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "", favorita: true, color: ''},
      {titulo: "estampa 3", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "Estampa no equipable", favorita: false, color: ''},
      {titulo: "estampa 4", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "", favorita: true, color: ''},
      {titulo: "estampa 5", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "", favorita: true, color: ''},
      {titulo: "estampa 6", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "Estampa no equipable", favorita: false, color: ''},
      {titulo: "estampa 4", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "", favorita: false, color: '#727294'},
      {titulo: "estampa 5", descripcion: "Esta estampa se ha ....", foto: "/assets/img/badge1.png", nota: "", favorita: false, color: '#727294'}
    ] 
  };
}
