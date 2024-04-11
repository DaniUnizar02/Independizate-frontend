import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {
  value: string = '';

  posts = [
    { userName: 'MariaPerez', title: 'Deliciosa receta de pasta carbonara', description: '¡Hoy cociné una deliciosa pasta carbonara siguiendo esta receta! Es súper fácil de hacer y sabe increíble.' },
    { userName: 'JuanGomez', title: 'Receta de brownies de chocolate', description: '¡Mis brownies de chocolate son todo un éxito! Aquí te comparto mi receta secreta para que también puedas disfrutarlos.' },
    { userName: 'AnaMartinez', title: 'Cómo hacer pizza casera', description: '¿Quién no ama la pizza? Te enseño cómo hacer una deliciosa pizza casera con tus ingredientes favoritos. ¡No te la pierdas!' },
    { userName: 'CarlosSanchez', title: 'Receta de gazpacho andaluz', description: 'En días calurosos, no hay nada mejor que un buen gazpacho andaluz. Aquí tienes mi receta tradicional para refrescarte este verano.' },
    { userName: 'LauraRodriguez', title: 'Receta de paella española', description: 'La paella española es un plato clásico que siempre impresiona. Te comparto mi receta favorita para que puedas disfrutarla en casa.' },
    { userName: 'PedroLopez', title: 'Cómo hacer sushi en casa', description: '¿Te encanta el sushi pero no puedes ir al restaurante? No te preocupes, te enseño cómo hacer sushi en casa de manera fácil y divertida.' },
    { userName: 'SofiaGarcia', title: 'Receta de tacos mexicanos', description: 'Los tacos mexicanos son una explosión de sabor. Aquí te doy mi receta auténtica para que puedas disfrutar de esta delicia en casa.' },
    { userName: 'DiegoHernandez', title: 'Cómo preparar un buen desayuno saludable', description: 'El desayuno es la comida más importante del día. Te comparto algunas ideas y recetas para preparar un desayuno saludable y energético.' },
    { userName: 'ElenaDiaz', title: 'Receta de tortilla española', description: 'La tortilla española es un clásico de la gastronomía española. Te enseño cómo hacerla paso a paso para que te salga perfecta.' },
    { userName: 'AndresMartinez', title: 'Deliciosa receta de tiramisú', description: 'El tiramisú es un postre italiano irresistible. Aquí tienes mi receta favorita para que puedas sorprender a tus invitados con un postre delicioso.' }
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
