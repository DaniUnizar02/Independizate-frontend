import { Component } from '@angular/core';

@Component({
  selector: 'app-denuncias-del-foro',
  templateUrl: './denuncias-del-foro.component.html',
  styleUrl: './denuncias-del-foro.component.css'
})
export class DenunciasDelForoComponent {
  denuncias = [
    {usuario: 'Mario', tipo:'Mensaje de foro erroneo', info: 'El mensaje debería estar en el foro "Compañero de piso" no en "Recetas"'},
    {usuario: 'Paula', tipo:'Mensaje inapropiado', info: 'El mensaje contiene lenguaje inapropiado'},
    {usuario: 'Juan', tipo:'Error en el mensaje', info: 'El mensaje contiene información incorrecta'},
    {usuario: 'Laura', tipo:'Mensaje de foro erroneo', info: 'El mensaje debería estar en el foro "Recetas" no en "Compañero de piso"'},
  ]
}
