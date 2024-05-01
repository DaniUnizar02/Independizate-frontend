import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { PostsComponent } from '../posts.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {
  value: string = '';
  posts: any[] = [];

  constructor(private router: Router, private postsComponent: PostsComponent) {}

  ngDoCheck() {
    this.posts = this.postsComponent.postsGeneral.filter(item => item.categoria === "Recetas");
    // console.log('Posts (R): ',this.posts); // LOG:
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
}
