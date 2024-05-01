import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PonerDenunciaComponent } from '../../poner-denuncia/poner-denuncia.component';
import { AnadirPostComponent } from '../../anadir-post/anadir-post.component';
import { PostsComponent } from '../posts.component';

@Component({
  selector: 'app-companero-piso',
  templateUrl: './companero-piso.component.html',
  styleUrl: './companero-piso.component.css'
})
export class CompaneroPisoComponent {
  value: string = '';
  posts: any[] = [];

  constructor(public dialog: MatDialog, private router: Router, private postsComponent: PostsComponent) {}

  ngDoCheck() {
    this.posts = this.postsComponent.postsGeneral.filter(item => item.categoria === "Compañero de piso");
    // console.log('Posts (CP): ',this.posts); // LOG:
  }

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
