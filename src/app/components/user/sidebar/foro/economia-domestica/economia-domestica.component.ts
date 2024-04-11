import { Component } from '@angular/core';

@Component({
  selector: 'app-economia-domestica',
  templateUrl: './economia-domestica.component.html',
  styleUrl: './economia-domestica.component.css'
})
export class EconomiaDomesticaComponent {
  value: string = '';

  posts = [
    { userName: 'MariaPerez', title: 'Consejos para ahorrar dinero en el supermercado', description: '¡Aprende cómo puedes ahorrar dinero en tus compras de supermercado sin sacrificar la calidad de los productos!' },
    { userName: 'JuanGomez', title: 'Cómo crear un presupuesto familiar', description: 'La clave para una economía doméstica saludable es tener un presupuesto bien planificado. Aquí te enseño cómo puedes crear uno.' },
    { userName: 'AnaMartinez', title: 'Ideas para reducir gastos en casa', description: 'Descubre algunas ideas creativas para reducir tus gastos en casa y mejorar tu situación financiera.' },
    { userName: 'CarlosSanchez', title: 'Cómo invertir sabiamente tus ahorros', description: 'No basta con ahorrar, también es importante invertir de manera inteligente. Aquí te doy algunos consejos para hacer crecer tu dinero.' },
    { userName: 'LauraRodriguez', title: 'Cómo planificar las compras mensuales', description: 'La planificación es clave para una economía doméstica exitosa. Aprende cómo puedes planificar tus compras mensuales para evitar gastos innecesarios.' },
    { userName: 'PedroLopez', title: 'Consejos para reducir el consumo de energía en casa', description: 'Reducir el consumo de energía no solo es bueno para el medio ambiente, también puede ayudarte a ahorrar dinero en tus facturas. Aquí te cuento cómo puedes hacerlo.' },
    { userName: 'SofiaGarcia', title: 'Cómo salir de deudas y mejorar tu situación financiera', description: 'Salir de deudas puede parecer abrumador, pero con un plan adecuado y algo de disciplina financiera, es posible. Aquí te doy algunos consejos para empezar.' },
    { userName: 'DiegoHernandez', title: 'Hábitos financieros para alcanzar la libertad económica', description: 'La libertad económica es el sueño de muchos. Descubre algunos hábitos financieros que te ayudarán a alcanzar tus metas financieras a largo plazo.' },
    { userName: 'ElenaDiaz', title: 'Cómo negociar mejores tarifas con proveedores', description: 'Negociar tarifas más bajas con proveedores puede ayudarte a reducir tus gastos mensuales. Aprende cómo puedes negociar de manera efectiva para obtener mejores precios.' },
    { userName: 'AndresMartinez', title: 'Cómo generar ingresos adicionales desde casa', description: 'A veces, la solución para mejorar tu situación financiera está en generar ingresos adicionales. Aquí te doy algunas ideas para empezar a ganar dinero desde casa.' }
  ];  
}
