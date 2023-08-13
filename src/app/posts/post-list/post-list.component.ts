import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts=[
  //   {title:"first post,", content:"its a muruza"},
  //   {title:"second post,", content:"its a samreen"},
  //   {title:"third post,", content:"its a asim"},
  //   {title:"fourth post,", content:"its a afhan"},
  // ]
  @Input() posts: Post[] = [];

  constructor(public postservice:PostsServiceService){}
  
  ngOnInit(){
    this.posts= this.postservice.getpost();
    console.log(this.posts)
  }
}
