import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-posts-create-component',
  templateUrl: './posts-create-component.component.html',
  styleUrls: ['./posts-create-component.component.css']
})
export class PostsCreateComponentComponent {
newPost = 'no data';
enteredcontent='';
enteredTitle='';
@Output() postcreated = new EventEmitter<Post>();


onaddpost(form:NgForm){
  if(form.invalid){
    return;
  }
const post:Post ={
  title :form.value.title,
  content :form.value.content
};
this.postcreated.emit(post);
}
}
