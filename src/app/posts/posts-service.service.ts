import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Title } from '@angular/platform-browser';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
 private posts: Post[]=[];
 private postUpdated = new Subject<Post[]>();
  constructor(private http:HttpClient , public router:Router) { }

  // getpost(){
  //  this.http.get<{message:string,posts:Post[]}>(
  //   'http://localhost:3000/api/posts')
  //   .subscribe((postsdata)=>{
  //  this.posts = postsdata.posts; 
  //  this.postUpdated.next([...this.posts])
  //  });
  // }
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData)=>{
        return postData.posts.map((post:any)=>{
          return{
            title:post.title,
            content:post.content,
            id:post._id
          };
        });
      }))
      .subscribe(transformedtData => {
        this.posts =transformedtData;
        this.postUpdated.next([...this.posts]);
      });
  }
getpostupdateListner(){
  return this.postUpdated.asObservable();
}

  // addPost(title:string,content:string){
  //   const post: Post={ id: null,title:title,content:content}
  //   this.posts.push(post);
  //   this.postUpdated.next([...this.posts])

  // }

  addPost(title: string, content: string) {
    const post: Post = { id :'', title: title, content: content };
    this.http
      .post<{ message: string,postId:string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
       const id = responseData.postId;
       post.id = id;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

deletePost(postid:string){
  this.http.delete("http://localhost:3000/api/posts/"+postid).subscribe(()=>{
   
  const updatedpost= this.posts.filter(post=> post.id != postid);
  this.posts = updatedpost;
  this.postUpdated.next([...this.posts]);
  })

}

}
