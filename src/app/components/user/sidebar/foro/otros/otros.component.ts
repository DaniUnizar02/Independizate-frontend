import { Component } from '@angular/core';

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrl: './otros.component.css'
})
export class OtrosComponent {
  value: string = '';
  
  posts = [
    { userName: 'MariaPerez', title: 'Consejos para mejorar tu productividad en el trabajo desde casa', description: '¡Descubre algunas estrategias y herramientas para ser más productivo/a mientras trabajas desde casa!' },
    { userName: 'JuanGomez', title: 'Cómo empezar un huerto urbano en tu balcón', description: 'Aprende cómo puedes empezar tu propio huerto urbano en el balcón de tu casa y disfrutar de alimentos frescos y saludables.' },
    { userName: 'AnaMartinez', title: 'Ideas para decorar tu hogar con plantas de interior', description: 'Las plantas de interior no solo añaden belleza a tu hogar, también pueden mejorar la calidad del aire. Descubre algunas ideas para decorar con plantas.' },
    { userName: 'CarlosSanchez', title: 'Cómo entrenar a tu perro para que obedezca órdenes básicas', description: '¡Entrenar a tu perro puede ser divertido y gratificante! Aprende algunas técnicas efectivas para enseñarle órdenes básicas como sentarse, quedarse y venir.' },
    { userName: 'LauraRodriguez', title: 'Cómo planificar un viaje por carretera inolvidable', description: 'Planificar un viaje por carretera puede ser emocionante. Descubre algunos consejos y destinos para hacer de tu viaje una experiencia inolvidable.' },
    { userName: 'PedroLopez', title: 'Consejos para mejorar tu técnica de fotografía', description: 'Si te apasiona la fotografía, siempre hay margen para mejorar. Descubre algunos consejos y técnicas para perfeccionar tu arte.' },
    { userName: 'SofiaGarcia', title: 'Cómo empezar a practicar yoga en casa', description: 'El yoga es una excelente manera de reducir el estrés y mejorar tu bienestar. Aprende cómo puedes empezar a practicar yoga en la comodidad de tu hogar.' },
    { userName: 'DiegoHernandez', title: 'Ideas para organizar una fiesta temática inolvidable', description: 'Organizar una fiesta temática puede ser una gran manera de celebrar una ocasión especial. Descubre algunas ideas creativas para hacer de tu fiesta un éxito.' },
    { userName: 'ElenaDiaz', title: 'Cómo empezar un diario de gratitud y sus beneficios', description: 'Llevar un diario de gratitud puede ayudarte a apreciar las pequeñas cosas de la vida y mejorar tu bienestar emocional. Aprende cómo puedes empezar.' },
    { userName: 'AndresMartinez', title: 'Consejos para mejorar tu técnica de escritura creativa', description: 'Si te gusta escribir, siempre hay espacio para mejorar. Descubre algunos consejos y ejercicios para potenciar tu creatividad y mejorar tu técnica de escritura.' }
  ];  
}
