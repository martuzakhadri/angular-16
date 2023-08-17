import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsServiceService } from '../posts-service.service';
@Component({
  selector: 'app-posts-create-component',
  templateUrl: './posts-create-component.component.html',
  styleUrls: ['./posts-create-component.component.css']
})
export class PostsCreateComponentComponent {
newPost = 'no data';
enteredcontent='';
enteredTitle='';

constructor(public postsService: PostsServiceService) {}

onaddpost(form:NgForm){
  if(form.invalid){
    return;
  }

this.postsService.addPost(form.value.title,form.value.content)
form.resetForm();
}
}
