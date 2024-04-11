import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  preguntasFrecuentes = [
    { pregunta: '¿Cómo puedo restablecer mi contraseña?', respuesta: 'Puedes restablecer tu contraseña haciendo clic en "Olvidé mi contraseña" en la página de inicio de sesión y siguiendo las instrucciones.' },
    { pregunta: '¿Cómo puedo actualizar mi información de perfil?', respuesta: 'Para actualizar tu información de perfil, ve a la página de configuración de tu cuenta y selecciona la opción para editar tu perfil. Luego, guarda los cambios realizados.' },
    { pregunta: '¿Cuál es el tiempo de entrega de los pedidos?', respuesta: 'El tiempo de entrega de los pedidos varía según la ubicación y el tipo de envío seleccionado. Por lo general, se entrega en un plazo de 3 a 5 días hábiles.' },
    { pregunta: '¿Qué métodos de pago aceptan?', respuesta: 'Aceptamos pagos con tarjeta de crédito, tarjeta de débito y PayPal.' },
    { pregunta: '¿Puedo cancelar mi pedido después de realizarlo?', respuesta: 'Sí, puedes cancelar tu pedido siempre y cuando no haya sido enviado. Para cancelar un pedido, ponte en contacto con nuestro equipo de atención al cliente lo antes posible.' },
    { pregunta: '¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?', respuesta: 'Puedes ponerte en contacto con nuestro servicio de atención al cliente a través del formulario de contacto en nuestro sitio web o por correo electrónico a support@ejemplo.com.' },
    { pregunta: '¿Ofrecen reembolsos?', respuesta: 'Sí, ofrecemos reembolsos en ciertas circunstancias. Por favor, consulta nuestra política de reembolsos para obtener más detalles.' },
    { pregunta: '¿Cuál es la política de devolución de productos?', respuesta: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre y cuando los productos estén en su estado original y no hayan sido usados.' },
    { pregunta: '¿Tienen tiendas físicas?', respuesta: 'Actualmente no contamos con tiendas físicas. Sin embargo, puedes comprar nuestros productos en línea a través de nuestro sitio web.' },
    { pregunta: '¿Cómo puedo realizar un seguimiento de mi pedido?', respuesta: 'Puedes realizar un seguimiento de tu pedido iniciando sesión en tu cuenta y visitando la sección de historial de pedidos. También recibirás actualizaciones por correo electrónico.' }
  ];

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
