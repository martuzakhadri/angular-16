import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './sign-up/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAuthenticated=false;
  private token: string;
  //private tokentimer:NodeJS.Timer;
  private tokentimer:any
  private authStatusListner = new Subject<boolean>();




  constructor(private http:HttpClient, private router:Router) { }

getauthStatusListner(){
  return this.authStatusListner.asObservable();
}

  getToken(){
    return this.token;
  }

   userisAuthenticated(){
    return this.isAuthenticated;
  }


  createUser(email:string,password:string){
    const authdata:AuthService={email:email,password:password}
    this.http.post("http://localhost:3000/api/user/signup",authdata).subscribe((response)=>{
      console.log(response)
    })
  }
  


login(email:string,password:string){
  const authdata:AuthService={email:email,password:password}
  this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/user/login",authdata).subscribe((response)=>{
   const token = response.token;
   this.token= token;
   if(token){
    const expiresInDuration= response.expiresIn
  this.setAuthTimer(expiresInDuration);
    this.isAuthenticated=true;
    this.authStatusListner.next(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
    this.saveAuthdata(token,expirationDate)
    this.router.navigate(["/"]);
   }  
  })
}

autoAuthUser(){
const authInformation  =  this.getAuthData();
if(!authInformation){
  return;
}
const now = new Date();
const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
if(expiresIn >0){
  this.token = authInformation.token;
  this.isAuthenticated = true;
  this.setAuthTimer(expiresIn/1000);
  this.authStatusListner.next(true);
}
}


logout(){
  this.token = null;
  this.isAuthenticated=false;
  this.authStatusListner.next(false);
  clearTimeout(this.tokentimer);
  this.removeAuthData();
  this.router.navigate(["/"]);
 
}


private setAuthTimer(duration:number){
  this.tokentimer= setTimeout(()=>{
    this.logout();
  },duration*1000);

}



private saveAuthdata(token:string,expirationDate:Date){
  localStorage.setItem('token',token);
  localStorage.setItem('expiration',expirationDate.toISOString());
}


private removeAuthData(){
  localStorage.removeItem("token");
  localStorage.removeItem("expiration")

}

// private getAuthdata(){
//   const token = localStorage.getItem("token");
//   const expirationDate =localStorage.getItem("expiration");
//   if(!token || !expirationDate ){
//    return
//     }
//   return{
//     token:token,
//     expirationDate:new Date(expirationDate)
//   }
  
// }
private getAuthData() {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  if (!token || !expirationDate) {
    return null;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate)
  }
}

}
