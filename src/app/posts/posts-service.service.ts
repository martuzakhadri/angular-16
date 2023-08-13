import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
 private posts: Post[]=[];
  constructor() { }

  getpost(){
    return [...this.posts]
  }
  addPost(title:string,content:string){
    const post: Post={title:title,content:content}
    this.posts.push(post);
  }
}
