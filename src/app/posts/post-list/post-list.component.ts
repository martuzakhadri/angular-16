import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsServiceService } from '../posts-service.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  // posts=[
  //   {title:"first post,", content:"its a muruza"},
  //   {title:"second post,", content:"its a mushtaq"},
  //   {title:"third post,", content:"its a asim"},
  //   {title:"fourth post,", content:"its a afhan"},
  // ]
  posts: Post[] = [];
  private postSub!: Subscription;
  totalPosts = 10;
  postperpage= 5;
  pagesizeOption= [1,2,5,10]
  userisAuthenticated = false;
  private authstatussub: Subscription;

  constructor(public postservice:PostsServiceService,private auth:AuthServiceService){}
  
  ngOnInit(){
    this.postservice.getPosts(this.postperpage,1);
    console.log(this.posts)
    this.postservice.getpostupdateListner().subscribe((posts:Post[])=>{
    this.posts=posts;
    });
    this.userisAuthenticated= this.auth.userisAuthenticated();
    this.authstatussub=this.auth.getauthStatusListner().subscribe(isAuthenticated=>{
      this.userisAuthenticated=isAuthenticated;
    })
  }
  
  // ngOnDestroy(){
  //   this.postSub.unsubscribe();
  //   this.authstatussub.unsubscribe();
  // }
  deletepost(postId:string){
    this.postservice.deletePost(postId);
  }
  onchangedpage(pageData:PageEvent){
    

  }
}
