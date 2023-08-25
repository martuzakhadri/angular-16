import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsCreateComponentComponent } from './posts/posts-create-component/posts-create-component.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
   {path:'',component:PostListComponent},
   {path:'create',component:PostsCreateComponentComponent},
   {path:'edit/:postId',component:PostsCreateComponentComponent},
   {path:'sign_in',component:SignInComponent},
   {path:'sign_up',component:SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
