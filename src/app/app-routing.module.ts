import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsCreateComponentComponent } from './posts/posts-create-component/posts-create-component.component';

const routes: Routes = [
   {path:'',component:PostListComponent},
   {path:'create',component:PostsCreateComponentComponent},
   {path:'edit/:postId',component:PostsCreateComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
