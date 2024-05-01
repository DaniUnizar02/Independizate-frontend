import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { PostsComponent } from '../posts.component';

@Component({
  selector: 'app-economia-domestica',
  templateUrl: './economia-domestica.component.html',
  styleUrl: './economia-domestica.component.css'
})
export class EconomiaDomesticaComponent {
  value: string = '';
  posts: any[] = [];

  constructor(private router: Router, private postsComponent: PostsComponent) {}

  ngDoCheck() {
    this.posts = this.postsComponent.postsGeneral.filter(item => item.categoria === "Economía doméstica");
    // console.log('Posts (ED): ',this.posts); // LOG:
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
