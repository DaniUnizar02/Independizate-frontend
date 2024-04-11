import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PonerDenunciaComponent } from '../poner-denuncia/poner-denuncia.component';
import { AnadirPostComponent } from '../anadir-post/anadir-post.component';

@Component({
  selector: 'app-companero-piso',
  templateUrl: './companero-piso.component.html',
  styleUrl: './companero-piso.component.css'
})
export class CompaneroPisoComponent {
  value: string = '';
  posts = [
    { userName: 'LuisGomez', title: 'Buscando compañero de piso en el centro de la ciudad', description: '¡Hola! Estoy buscando un compañero de piso para compartir un apartamento en el centro de la ciudad. Si estás interesado o conoces a alguien que pueda estarlo, ¡contáctame!' },
    { userName: 'AnaMartinez', title: 'Habitación disponible en piso compartido', description: '¡Hola a todos! Tengo una habitación disponible en mi piso compartido en el barrio X. El ambiente es amigable y acogedor. Si estás interesado, ¡envíame un mensaje!' },
    { userName: 'DiegoHernandez', title: 'Compañero de piso buscando', description: '¡Hola! Soy un estudiante universitario en busca de un compañero de piso en la zona cercana a la universidad. Preferiblemente alguien tranquilo y responsable. Si estás interesado, ¡hagamos contacto!' },
    { userName: 'LauraRodriguez', title: 'Piso compartido en busca de compañero/a', description: '¡Hola! Somos dos personas que buscamos un tercer compañero/a de piso para compartir un apartamento en el barrio Y. Si te interesa, ¡no dudes en ponerte en contacto con nosotros!' },
    { userName: 'CarlosSanchez', title: 'Buscando compañero de piso en zona tranquila', description: '¡Saludos! Estoy buscando un compañero de piso para compartir un apartamento en una zona tranquila de la ciudad. Si eres ordenado/a y respetuoso/a, ¡contáctame para más detalles!' },
    { userName: 'MariaPerez', title: 'Habitación individual en piso compartido', description: '¡Hola! Tengo una habitación individual disponible en mi piso compartido. El ambiente es tranquilo y el piso está bien ubicado. Si estás interesado/a, ¡no dudes en contactarme!' },
    { userName: 'SofiaGarcia', title: 'Compañero/a de piso buscando', description: '¡Hola! Estoy en busca de un compañero/a de piso para compartir un apartamento en el centro de la ciudad. Si te interesa, ¡escríbeme y charlemos!' },
    { userName: 'PedroLopez', title: 'Habitación en piso compartido disponible', description: '¡Hola a todos! Tengo una habitación disponible en mi piso compartido en el barrio Z. El ambiente es tranquilo y respetuoso. Si estás interesado/a, ¡no dudes en ponerte en contacto conmigo!' },
    { userName: 'ElenaDiaz', title: 'Buscando compañero/a de piso responsable', description: '¡Hola! Estoy buscando un compañero/a de piso responsable y tranquilo/a para compartir un apartamento en una zona céntrica. Si estás interesado/a, ¡escríbeme!' },
    { userName: 'AndresMartinez', title: 'Compañero/a de piso buscando', description: '¡Saludos! Soy un profesional en busca de un compañero/a de piso para compartir un apartamento cerca del centro de la ciudad. Si compartes intereses similares, ¡contáctame!' }
  ];

  constructor(public dialog: MatDialog, private router: Router) {}

  navigateToConversacion() {
    this.router.navigate(['sidebar','foro','conversacion'])
  }

  openDialogAdd(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AnadirPostComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogDenuncia(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PonerDenunciaComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
