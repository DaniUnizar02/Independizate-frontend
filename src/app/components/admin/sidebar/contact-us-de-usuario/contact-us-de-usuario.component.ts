import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us-de-usuario',
  templateUrl: './contact-us-de-usuario.component.html',
  styleUrl: './contact-us-de-usuario.component.css'
})
export class ContactUsDeUsuarioComponent {
  contacts = [
    {usuario: 'Mario', tipo:'Queja', info: 'El mapa tarda mucho en cargar'},
    {usuario: 'Paula', tipo:'Sugerencia', info: 'Me gustaría poder buscar los perfiles de mis amigos'},
    {usuario: 'Juan', tipo:'Otros', info: 'He tenido un problema con un usuario ¿Como lo puedo denunciar?'},
    {usuario: 'Laura', tipo:'Queja', info: 'La web me confunde'},
  ];
}
