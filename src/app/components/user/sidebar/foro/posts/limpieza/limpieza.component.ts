import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-limpieza',
  templateUrl: './limpieza.component.html',
  styleUrl: './limpieza.component.css'
})
export class LimpiezaComponent {
  value: string = '';

  posts = [
    { userName: 'MariaPerez', title: 'Consejos para mantener tu hogar limpio y ordenado', description: '¡Descubre algunos consejos prácticos para mantener tu hogar limpio y ordenado sin mucho esfuerzo!' },
    { userName: 'JuanGomez', title: 'Productos de limpieza caseros que realmente funcionan', description: '¡Aprende a hacer tus propios productos de limpieza caseros que son efectivos y económicos!' },
    { userName: 'AnaMartinez', title: 'Cómo organizar tu armario de manera eficiente', description: 'Descubre algunos trucos y consejos para organizar tu armario de manera eficiente y mantenerlo ordenado.' },
    { userName: 'CarlosSanchez', title: 'Cómo limpiar a fondo tu cocina en pocos pasos', description: '¡Sigue estos sencillos pasos para limpiar a fondo tu cocina y mantenerla impecable todos los días!' },
    { userName: 'LauraRodriguez', title: 'Ideas creativas para organizar tu despensa', description: 'Organizar tu despensa puede ayudarte a ahorrar tiempo y dinero. Aquí tienes algunas ideas creativas para hacerlo.' },
    { userName: 'PedroLopez', title: 'Trucos para limpiar eficazmente los electrodomésticos', description: 'Aprende algunos trucos y consejos para limpiar tus electrodomésticos de manera eficaz y mantenerlos en buen estado.' },
    { userName: 'SofiaGarcia', title: 'Cómo eliminar manchas difíciles de los muebles', description: '¡Dile adiós a las manchas difíciles en tus muebles con estos consejos prácticos y efectivos para la limpieza!' },
    { userName: 'DiegoHernandez', title: 'Consejos para mantener tu baño limpio y reluciente', description: 'Descubre algunos consejos simples pero efectivos para mantener tu baño limpio y reluciente todos los días.' },
    { userName: 'ElenaDiaz', title: 'Cómo limpiar y desinfectar tu hogar de manera segura', description: 'Aprende la importancia de la limpieza y la desinfección en el hogar y cómo hacerlo de manera segura y efectiva.' },
    { userName: 'AndresMartinez', title: 'Trucos para mantener tus suelos impecables', description: 'Mantener tus suelos impecables puede ser fácil con estos simples trucos y consejos de limpieza para diferentes tipos de suelos.' }
  ];  

  constructor(private router: Router) {}

  cambiarRoute(event: MatTabChangeEvent) {
    var ruta = event.tab.textLabel.toLowerCase().replace(' ', '-');
    console.log(ruta);
    if (ruta=="compañero-de piso") {
      ruta = "piso";
    } else if (ruta=="economía-doméstica") {
      ruta = "economia";
    }
    console.log(ruta);
    this.router.navigate(['sidebar','foro', ruta])
  } 
}
