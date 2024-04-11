import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForoComponent } from './foro.component';
import { ConversacionComponent } from './conversacion/conversacion.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: '', component: ForoComponent, children: [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then( x => x.PostsModule) },
    { path: 'conversacion', component: ConversacionComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForoRoutingModule { }
