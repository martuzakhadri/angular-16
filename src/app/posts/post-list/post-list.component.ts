import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsServiceService } from '../posts-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
  // posts=[
  //   {title:"first post,", content:"its a muruza"},
  //   {title:"second post,", content:"its a mushtaq"},
  //   {title:"third post,", content:"its a asim"},
  //   {title:"fourth post,", content:"its a afhan"},
  // ]
  posts: Post[] = [];
  private postSub!: Subscription;
  constructor(public postservice:PostsServiceService){}
  
  ngOnInit(){
    this.postservice.getPosts();
    console.log(this.posts)
    this.postservice.getpostupdateListner().subscribe((posts:Post[])=>{
    this.posts=posts;
    });
  }
  
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
  deletepost(postId:string){
    this.postservice.deletePost(postId);
  }
}
